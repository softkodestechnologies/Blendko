const Category = require('../models/category.model');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.getCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find().populate('products');

  res.status(200).json({
    success: true,
    categories,
  });
});

exports.getCategoryByName = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findOne({
    name: req.params.name.split('}').join(''),
  })
    .populate('products')
    .exec();

  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }

  res.status(200).json({
    success: true,
    category,
    productCount: category.products.length,
  });
});