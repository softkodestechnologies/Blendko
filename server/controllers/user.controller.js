const User = require('../models/user.model');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const { createHash } = require('node:crypto');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorHandler('User already exists', 400));
  }

  const user = await User.create({
    name,
    email,
    password,
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

  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email & password', 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select('+password');
  console.log(user, 'user found')

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }


  // Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }

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

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url
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
  } = req.body;


  const newUserData = {
    name,
    email,
    gender: gender || '',
  };

  // Update avatar
  if (avatar !== '') {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;

    // Delete previous image
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

// ADMIN: Get all users => /api/v1/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = req.query.pp || 5;

  const last30Days = Date.now() - 30 * 24 * 60 * 60 * 1000;

  const usersCount = await User.countDocuments();
  const usersCountLast30Days = await User.countDocuments({
    createdAt: { $gte: last30Days },
  });

  const apiFeatures = new ApiFeatures(
    User.find().sort({ createdAt: -1 }).populate('order'),
    req.query
  )
    .search()
    .filter()
    .pagination(resPerPage);

  const users = await apiFeatures.query;

  res.status(200).json({
    success: true,
    users,
    usersCount,
    new_customers: usersCountLast30Days,
  });
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
    roles: req.body.roles,
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