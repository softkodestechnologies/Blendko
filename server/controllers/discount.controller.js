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

exports.applyDiscount = catchAsyncErrors(async (req, res, next) => {
  const { code, cartItems } = req.body;
  console.log(req.body);
  const discount = await Discount.findOne({ code, status: 'active' });

  if (!discount) {
    return next(new ErrorHandler('Invalid or expired discount code', 400));
  }

  if (discount.usageLimit > 0 && discount.usageCount >= discount.usageLimit) {
    return next(new ErrorHandler('Discount usage limit exceeded', 400));
  }

  const now = new Date();
  if (now < discount.startsOn || now > discount.expiresOn) {
    return next(new ErrorHandler('Discount is not active', 400));
  }

  // Check if the discount applies to the products in the cart
  const applicableItems = cartItems.filter(item => 
    discount.products.length === 0 || discount.products.includes(item.product)
  );

  if (applicableItems.length === 0) {
    return next(new ErrorHandler('Discount does not apply to any items in your cart', 400));
  }

  // Calculate the discount amount
  let discountAmount = 0;
  if (discount.type === 'percentage') {
    discountAmount = applicableItems.reduce((total, item) => 
      total + (item.price * item.quantity * discount.value / 100), 0
    );
  } else if (discount.type === 'fixed_amount') {
    discountAmount = Math.min(
      discount.value,
      applicableItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }

  // Increment usage count
  discount.usageCount += 1;
  await discount.save();

  res.status(200).json({
    success: true,
    discount: {
      ...discount.toObject(),
      applicableItems,
      discountAmount
    }
  });
});
