const Category = require('../models/category.model');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const ApiFeatures = require('../utils/apiFeatures');

exports.getCategories = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = Number(req.query.pp) || 10;
  const categoryCount = await Category.countDocuments();

  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .search('name')
    .pagination(resPerPage);

  const categories = await apiFeatures.query.populate('products');

  res.status(200).json({
    success: true,
    categories,
    categoryCount,
    resPerPage,
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

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.create({ name });

  res.status(201).json({
    success: true,
    category,
  });
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true }
  );

  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
});