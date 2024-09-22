const Discount = require('../models/discount.model');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.createDiscount = catchAsyncErrors(async (req, res, next) => {
  const discount = await Discount.create(req.body);
  res.status(201).json({ success: true, discount });
});

exports.getAllDiscounts = catchAsyncErrors(async (req, res, next) => {
  const discounts = await Discount.find();
  res.status(200).json({ success: true, discounts });
});

exports.getDiscount = catchAsyncErrors(async (req, res, next) => {
  const discount = await Discount.findById(req.params.id);
  if (!discount) return next(new ErrorHandler('Discount not found', 404));
  res.status(200).json({ success: true, discount });
});

exports.updateDiscount = catchAsyncErrors(async (req, res, next) => {
  let discount = await Discount.findById(req.params.id);
  if (!discount) return next(new ErrorHandler('Discount not found', 404));
  discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.status(200).json({ success: true, discount });
});

exports.deleteDiscount = catchAsyncErrors(async (req, res, next) => {
  const discount = await Discount.findById(req.params.id);
  if (!discount) {
    return next(new ErrorHandler('Discount not found', 404));
  }

  await discount.deleteOne();

  res.status(200).json({ success: true, message: 'Discount deleted successfully' });
});
