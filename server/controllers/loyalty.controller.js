const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { v4: uuidv4 } = require('uuid');

// Generate referral code
exports.generateReferralCode = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.referralCode) {
    return res.status(200).json({
      success: true,
      referralCode: user.referralCode,
    });
  }

  const referralCode = uuidv4().substring(0, 8);
  user.referralCode = referralCode;
  await user.save();

  res.status(200).json({
    success: true,
    referralCode,
  });
});

// Apply referral code
exports.applyReferralCode = catchAsyncErrors(async (req, res, next) => {
  const { referralCode } = req.body;

  const referrer = await User.findOne({ referralCode });

  if (!referrer) {
    return next(new ErrorHandler('Invalid referral code', 400));
  }

  if (referrer.id === req.user.id) {
    return next(new ErrorHandler('You cannot refer yourself', 400));
  }

  const user = await User.findById(req.user.id);

  if (user.referredBy) {
    return next(new ErrorHandler('You have already used a referral code', 400));
  }

  user.referredBy = referrer.id;
  referrer.referrals.push(user.id);

  await user.save();
  await referrer.save();

  res.status(200).json({
    success: true,
    message: 'Referral code applied successfully',
  });
});

// Get referral discount
exports.getReferralDiscount = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const hasReferral = user.referredBy || user.referrals.length > 0;
  const discountPercentage = hasReferral ? 10 : 0;

  res.status(200).json({
    success: true,
    discountPercentage,
  });
});