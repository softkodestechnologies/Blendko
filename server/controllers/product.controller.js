const cloudinary = require('cloudinary');
const fs = require('fs');

const Product = require('../models/product.model');
const Category = require('../models/category.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');


exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const productFiles = req.files['images'];
  const patternFiles = req.files['patterns'];


  const {
    name,
    description,
    price,
    category,
    subcategory,
    quantity,
    discount,
    features,
    measurement,
    user,
    colors,
    dress_style,
    gender,
    sizes,
    fashion_collection,
    technology,
    brand,
    attributes,
    weight,
    width,
    height
  } = req.body;
  let { isCustomizable } = req.body

  if (!productFiles) {
    return next(new ErrorHandler('Please upload product images', 400));
  }

  if (productFiles.length > 6) {
    return next(new ErrorHandler('Please upload less than 6 product images', 400));
  }

  const imagesLinks = [];
  const patternLinks = [];

  // Upload product images
  for (let i = 0; i < productFiles.length; i++) {
    const result = await cloudinary.v2.uploader.upload(productFiles[i].path, {
      folder: 'Blendko/products',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });

    fs.unlink(productFiles[i].path, (err) => {
      if (err) console.error(`Failed to delete local image file: ${err}`);
    });
  }

  // Upload pattern images
  if (patternFiles) {
    for (let i = 0; i < patternFiles.length; i++) {
      const result = await cloudinary.v2.uploader.upload(patternFiles[i].path, {
        folder: 'Blendko/patterns',
      });

      patternLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });

      fs.unlink(patternFiles[i].path, (err) => {
        if (err) console.error(`Failed to delete local pattern file: ${err}`);
      });
    }
  }

  const count = await Product.countDocuments();
  const sku = `SKU${(count + 1).toString().padStart(6, '0')}`;
  isCustomizable = isCustomizable === 'on' ? true : false;

  const product = new Product({
    name,
    description,
    price: Number(price),
    category,
    subcategory,
    quantity,
    discount,
    features,
    measurement,
    user,
    images: imagesLinks,
    patterns: patternLinks,
    colors,
    dress_style,
    gender,
    sizes, 
    fashion_collection,
    technology,
    brand,
    attributes,
    isCustomizable,
    weight,
    width,
    height,
    sku
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
  console.log("Product routes requested");

  const resPerPage = req.query.pp || 10;

  const sumAvailableQuantity = await Product.aggregate([
    {
      $match: { available_quantity: { $gt: 0 } },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$available_quantity' },
      },
    },
  ]);

  const apiFeatures = new ApiFeatures(Product.find(), req.query, Product)
    .search()
    .filter()
    .sort()
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