const User = require('../models/user.model');
const Product = require('../models/product.model');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const { createHash } = require('node:crypto');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');
const ApiFeatures = require('../utils/apiFeatures');
const { generateUniqueReferralCode } = require('../utils/genCode');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, referralCode } = req.body;
  console.log(name, 'Name')
  console.log(email, 'Email')
  console.log(password, 'Password')
  console.log(referralCode, 'ReferralCode')

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorHandler('User already exists', 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if(referralCode) {

    const referrer = await User.findOne({ referralCode });
    if (referrer) {
      referrer.referrals.push(user._id);
      user.referredBy = referrer._id;

      await referrer.save();
      await user.save()
    }

  }

  await sendEmail({
    email: user.email,
    subject: 'Welcome to the World of Blendko',
    message: `Dear ${user.name},\n\nWelcome to our store! We're excited to have you as a new member.`,
  });

  const token = user.getJwtToken();
  res.status(201).json({
    success: true, 
    user,
    token,
  });
});

//Google register
exports.googleRegister = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.googleAccessToken)
    return next(new ErrorHandler('Please provide a valid token', 400));

  const { googleAccessToken } = req.body;

  const fetchedUser = await fetch(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    }
  );

  const { given_name, email } = await fetchedUser.json();

  const isExisting = await User.findOne({ email });

  if (isExisting) return next(new ErrorHandler('User already exists', 400));

  const user = await User.create({
    name: given_name,
    email,
    password: email + process.env.GOOGLE_SECRET,
  });

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    user,
    token,
  });
});



// Login User => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('Please enter email & password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }


  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  user.lastLoginAt = Date.now();
  await user.save({ validateBeforeSave: false });

  sendToken(user, 201, res);
});

//Google Login
exports.googleLogin = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.googleAccessToken)
    return next(new ErrorHandler('Please provide a valid token', 400));

  const { googleAccessToken } = req.body;

  const fetchedUser = await fetch(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    }
  );

  const { email } = await fetchedUser.json();

  const isExisting = await User.findOne({ email });

  if (!isExisting) return next(new ErrorHandler('User not found', 404));

  isExisting.lastLoginAt = Date.now();
  await isExisting.save({ validateBeforeSave: false });

  sendToken(isExisting, 200, res);
});


// Logout User => /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

// Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404));
  }


  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });


  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Blendko Password Recovery',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler('Password reset token is invalid or has been expired',400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  // Setup new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update / Change Password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

// Update User Profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    gender,
    avatar,
    phone,
    dateOfBirth,
    country,
    province,
    city,
    postcode,
  } = req.body;

  // Find the current user
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  const newUserData = {
    name: name || user.name,
    email: email || user.email,
    gender: gender || user.gender || '',
    phone: phone || user.phone,
    dateOfBirth: dateOfBirth || user.dateOfBirth,
    country: country || user.country,
    province: province || user.province,
    city: city || user.city,
    postcode: postcode || user.postcode,
  };

  // Update avatar only if a new one is provided
  if (avatar && avatar !== '') {
    // Check if user has an existing avatar
    if (user.avatar && user.avatar.public_id) {
      try {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      } catch (error) {
        console.error('Error deleting old avatar:', error);
        // Continue with the update even if there's an error deleting the old avatar
      }
    }

    try {
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale',
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } catch (error) {
      console.error('Error uploading new avatar:', error);
      return next(new ErrorHandler('Error uploading new avatar', 500));
    }
  }

  // Update the user
  const updatedUser = await User.findByIdAndUpdate(user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user: updatedUser,
  });
});

// ADMIN: Get all users => /api/v1/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    const resPerPage = parseInt(req.query.pp) || 10;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || '';

    const last30Days = Date.now() - 30 * 24 * 60 * 60 * 1000;

    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const usersCount = await User.countDocuments(searchQuery);
    const usersCountLast30Days = await User.countDocuments({
      ...searchQuery,
      createdAt: { $gte: last30Days },
    });

    const skip = resPerPage * (page - 1);

    const users = await User.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(resPerPage);

    res.status(200).json({
      success: true,
      users,
      usersCount,
      resPerPage,
      new_customers: usersCountLast30Days,
    });
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    return next(new ErrorHandler('Error fetching users', 500));
  }
});

// ADMIN: Get all admins => /api/v1/admin/admins
exports.getAllAdmins = catchAsyncErrors(async (req, res, next) => {
  try {
    const admins = await User.find({ "role.0": { $in: ["admin", "super-admin"] } })
    .select('name email role createdAt status');

    res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    console.error('Error in getAllAdmins:', error);
    return next(new ErrorHandler('Error fetching admins', 500));
  }
});


// ADMIN: Get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// ADMIN: Update user role => /api/v1/admin/user/:id
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

// ADMIN: Create Admin 
exports.createAdmin = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  console.log(req.body, 'Body')

  if (!role[0] || (role[0] !== 'admin' && role[0] !== 'super-admin')) {
    return next(new ErrorHandler('Invalid role specified', 400));
  }
 console.log(role)
 let newAdminData;
  try {
     newAdminData = await User.create({
      name,
      email,
      password,
      role,
    });
  } catch(e) {
    console.log(e, 'Error happened')
  }

  res.status(201).json({
    success: true,
    newAdminData,
  });
});

// Update admin details
exports.updateAdmin = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, role, houseAddress, state, country, phoneNumber } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler(`User not found with id: ${id}`, 404));
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.role = role || user.role;
  user.houseAddress = houseAddress || user.houseAddress;
  user.state = state || user.state;
  user.country = country || user.country;
  user.phoneNumber = phoneNumber || user.phoneNumber;

  await user.save({ validateBeforeSave: true });

  res.status(200).json({
    success: true,
    user,
  });
});

// Update admin status
exports.updateAdminStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler(`User not found with id: ${id}`, 404));
  }

  user.status = status;

  await user.save({ validateBeforeSave: true });

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete admin
exports.deleteAdmin = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
  }

  if (!user.role.includes('admin')) {
    return next(new ErrorHandler('You can only delete admin users', 400));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Admin deleted successfully',
  });
});

// ADMIN: Delete user => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
     return next(
       new ErrorHandler(`User not found with id: ${req.params.id}`)
     );
    }
    // Remove avatar
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    await user.remove();
    res.status(200).json({
     success: true,
     message: 'User deleted successfully',
    });
});

exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
  const cartItems = await User.findById(req.user.id).populate(
    'cart.product',
    'name price images description discount available_quantity'
  );

  res.status(200).json({
    success: true,
    cartItems,
  });
});

exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const items = req.body.items;

  items.forEach(async (item) => {
    const product = await Product.findById(item);

    const isProductInCart = req.user.cart.find(
      (item) => item.product.toString() === product._id.toString()
    );

    if (isProductInCart) {
      await User.findOneAndUpdate(
        { _id: req.user.id, 'cart.product': product._id },
        { $inc: { 'cart.$.quantity': 1 } },
        { new: true, useFindAndModify: false }
      );
    } else {
      await User.findByIdAndUpdate(
        req.user.id,
        {
          $push: {
            cart: {
              product: product._id,
              quantity: 1,
              size: item.size,  
              color: item.color 
            },
          },
        },
        { new: true, useFindAndModify: false }
      );
    }
  });

  res.status(200).json({
    success: true,
  });
});

exports.removeFromCart = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  const isProductInCart = req.user.cart.find(
    (item) => item.product.toString() === product._id.toString()
  );

  if (!isProductInCart) {
    return next(new ErrorHandler('Product not found in cart', 404));
  }

  if (isProductInCart.quantity <= 1) {
    await User.findOneAndUpdate(
      { _id: req.user.id, 'cart.product': product._id },
      { $pull: { cart: { product: product._id } } },
      { new: true, useFindAndModify: false }
    );
  } else {
    await User.findOneAndUpdate(
      { _id: req.user.id, 'cart.product': product._id },
      { $inc: { 'cart.$.quantity': -1 } },
      { new: true, useFindAndModify: false }
    );
  }

  res.status(200).json({
    success: true,
  });
});

exports.deleteCartItem = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  const isProductInCart = req.user.cart.find(
    (item) => item.product.toString() === product._id.toString()
  );

  if (!isProductInCart) {
    return next(new ErrorHandler('Product not found in cart', 404));
  }

  await User.findOneAndUpdate(
    { _id: req.user.id, 'cart.product': product._id },
    { $pull: { cart: { product: product._id } } },
    { new: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
  });
});

exports.getWishlist = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('wishlist.product');

  res.status(200).json({
    success: true,
    wishlist: user.wishlist,
  });
});


exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.body.productId);

  if(!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const user = await User.findById(req.user.id);
  const isProductInWishlist = user.wishlist.some(item => item.product.toString() === product._id.toString());

  if (isProductInWishlist) {
    return res.status(400).json({
      success: false,
      message: 'Product already in wishlist'
    });
  }

  user.wishlist.push({ product: product._id });
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Product added to wishlist'
  });
});

exports.removeFromWishlist = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.body.productId);

  if(!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const user = await User.findById(req.user.id);
  user.wishlist = user.wishlist.filter(item => item.product.toString() !== product._id.toString());
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Product removed from wishlist'
  });
});


exports.getPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.points);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching points' });
  }
};

// Fetch user referrals
exports.getReferrals = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('referrals', 'name');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.referrals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching referrals' });
  }
};

// Update referral code
exports.updateReferralCode = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.referralCode = await generateUniqueReferralCode();
    await user.save();

    res.json(user.referralCode);
  } catch (error) {
    res.status(500).json({ message: 'Error updating referral code' });
  }
};

// Join loyalty program
exports.joinLoyaltyProgram = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isLoyaltyMember) {
      return res.status(400).json({ message: 'User is already a loyalty member' });
    }

    user.isLoyaltyMember = true;

    user.dOB = req.body.dateOfBirth;

    user.points = 0;

    if (!user.referralCode) {
      user.referralCode = await generateUniqueReferralCode();
    }

    await user.save();

    res.json({ message: 'Successfully joined loyalty program', referralCode: user.referralCode, user });
  } catch (error) {
    res.status(500).json({ message: 'Error joining loyalty program' });
  } 
};
