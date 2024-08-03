const DeliveryAddress = require('../models/deliveryAddress.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//Create or Update deliveryAddress
exports.createOrUpdateDeliveryAddress = catchAsyncErrors(async (req, res, next) => {
  const {
    street,
    aptBuildingSuite,
    postcode,
    city,
    province,
    country,
    phoneNumber
  } = req.body;

  const addressData = {
    user: req.user.id,
    street,
    aptBuildingSuite,
    postcode,
    city,
    province,
    country,
    phoneNumber
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

// Get delivery address
exports.getDeliveryAddress = catchAsyncErrors(async (req, res, next) => {
  const deliveryAddress = await DeliveryAddress.findOne({ user: req.user.id });

  if (!deliveryAddress) {
    return next(new ErrorHandler('Delivery address not found', 404));
  }

  res.status(200).json({
    success: true,
    deliveryAddress
  });
});

// Delete delivery address
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