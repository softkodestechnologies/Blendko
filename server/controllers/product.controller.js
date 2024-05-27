const cloudinary = require('cloudinary');
const fs = require('fs');

const Product = require('../models/product.model');
const Category = require('../models/category.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const files = req.files;

  const {
    name,
    description,
    price,
    category,
    quantity,
    discount,
    features,
    measurement,
    user,
    images,
  } = req.body;

  if (!files) return next(new ErrorHandler('Please upload images', 400));

  if (files.length > 6)
    return next(new ErrorHandler('Please upload less than 6 images', 400));

  if (files.length < 6)
    return next(new ErrorHandler('Please upload 6 images', 400));

  const imagesLinks = [];

  for (let i = 0; i < files.length; i++) {
    const result = await cloudinary.v2.uploader.upload(files[i].path, {
      folder: 'afrobean/products',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });

    fs.unlinkSync(files[i].path);
  }

  const product = new Product({
    name,
    description,
    price: Number(price),
    category,
    quantity,
    discount,
    features,
    measurement,
    user,
    images: imagesLinks,
  });

  product.available_quantity = quantity;

  const foundCategory = await Category.findOne({ name: category });

  if (foundCategory) {
    foundCategory.products.push(product._id);
    await foundCategory.save();
    await product.save();

    return res.status(201).json({
      message: 'Product created successfully',
      product,
      success: true,
    });
  }

  const newCategory = new Category({
    name: category,
    products: product._id,
  });

  await newCategory.save();
  await product.save();

  res.status(201).json({
    message: 'Product created successfully',
    product,
    success: true,
  });
});

exports.getProducts = catchAsyncErrors(async (req, res) => {
  const resPerPage = req.query.pp || 5;
  let sort;

  if (req.query.sort && req.query.sort === '-1') {
    sort = { price: -1 };
  } else {
    sort = { price: 1 };
  }

  const sumAvailableQuantity = await Product.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$available_quantity' },
      },
    },
  ]);

  const apiFeatures = new ApiFeatures(
    Product.find().sort(sort || { createdAt: -1 }),
    req.query,
    Product
  )
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;
  const countfoundSearchedProducts = await apiFeatures.document;

  res.status(200).json({
    products,
    success: true,
    productsCount: countfoundSearchedProducts,
    availableProducts: sumAvailableQuantity[0].total,
  });
});

exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler('Product not found', 404));

  res.status(200).json({
    product,
    success: true,
  });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler('Product not found', 404));

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    product,
    success: true,
  });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler('Product not found', 404));

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: 'Product deleted successfully',
    success: true,
  });
});

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(req.params.id);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.num_of_reviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    reviews: product.reviews,
    success: true,
  });
});

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});