const DeliveryAddress = require('../models/deliveryAddress.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.createDeliveryAddress = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    street,
    aptBuildingSuite,
    postcode,
    city,
    province,
    country,
    phoneNumber,
    isDefaultAddress,
  } = req.body;

  const addressData = {
    user: req.user.id,
    firstName,
    lastName,
    street,
    aptBuildingSuite,
    postcode,
    city,
    province,
    country,
    phoneNumber,
    isDefaultAddress
  };

  let deliveryAddress = await DeliveryAddress.findOne({ user: req.user.id });

  if (deliveryAddress) {
    deliveryAddress = await DeliveryAddress.findOneAndUpdate(
      { user: req.user.id },
      addressData,
      { new: true, runValidators: true, useFindAndModify: false }
    );
  } else {
    deliveryAddress = await DeliveryAddress.create(addressData);
  }

  res.status(200).json({
    success: true,
    deliveryAddress
  });
});

exports.getDeliveryAddress = catchAsyncErrors(async (req, res, next) => {
  const deliveryAddress = await DeliveryAddress.findOne({ user: req.user.id });

  if (!deliveryAddress) {
    return res.status(404).json({
      success: false,
      message: 'Delivery address not found'
    });
  }

  res.status(200).json({
    success: true,
    deliveryAddress
  });
});

exports.updateDeliveryAddress = catchAsyncErrors(async (req, res, next) => {
  const {
    street,
    aptBuildingSuite,
    postcode,
    city,
    province,
    country,
    phoneNumber,
    isDefaultAddress
  } = req.body;

  const addressData = {
    street,
    aptBuildingSuite,
    postcode,
    city,
    province,
    country,
    phoneNumber,
    isDefaultAddress
  };

  const deliveryAddress = await DeliveryAddress.findOneAndUpdate(
    { user: req.user.id },
    addressData,
    { new: true, runValidators: true, useFindAndModify: false }
  );

  if (!deliveryAddress) {
    return next(new ErrorHandler('Delivery address not found', 404));
  }

  res.status(200).json({
    success: true,
    deliveryAddress
  });
});

exports.deleteDeliveryAddress = catchAsyncErrors(async (req, res, next) => {
  const deliveryAddress = await DeliveryAddress.findOne({ user: req.user.id });

  if (!deliveryAddress) {
    return next(new ErrorHandler('Delivery address not found', 404));
  }

  await deliveryAddress.remove();

  res.status(200).json({
    success: true,
    message: 'Delivery address deleted successfully'
  });
});