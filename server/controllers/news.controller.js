const News = require('../models/news.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');
const fs = require('fs')

// Create new news  
exports.createNews = catchAsyncErrors(async (req, res, next) => {
  let newsData = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    category: req.body.category,
    email: req.body.email,
    publishDate: new Date(`${req.body.publishDate}T${req.body.publishTime}`),
    status: req.body.status,
    tags: req.body.tags.split(',').map(tag => tag.trim())
  };

  const file = req.file; 

  if (!file) return next(new ErrorHandler('Please upload an image', 400));

  const result = await cloudinary.v2.uploader.upload(file.path, {
    folder: 'Blendko/news',
  });

  newsData.image = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  fs.unlinkSync(file.path);

  newsData.user = req.user.id;

  const news = await News.create(newsData);

  res.status(201).json({
    success: true,
    news
  });
});

// Get all news  
exports.getNews = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 8;
    const page = parseInt(req.query.page) || 1;
    const newsCount = await News.countDocuments();
  
    const apiFeatures = new APIFeatures(News.find(), req.query, News)
      .search()
      .filter()
      .pagination(resPerPage);
  
    const news = await apiFeatures.query;
  
    res.status(200).json({
      success: true,
      count: news.length,
      newsCount,
      news,
      page
    });
  });

// Get single news details 
exports.getSingleNews = catchAsyncErrors(async (req, res, next) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    return next(new ErrorHandler('News not found', 404));
  }

  const relatedNews = await News.find({
    _id: { $ne: news._id },
    category: news.category
  }).limit(2);

  res.status(200).json({
    success: true,
    news,
    relatedNews
  })
})

// Update News
exports.updateNews = catchAsyncErrors(async (req, res, next) => {
  let news = await News.findById(req.params.id);
  console.log(req.body, 'This should be the news body');
  console.log(req.params.id, 'This should be the id')

  if (!news) {
    return next(new ErrorHandler('News not found', 404));
  }

  let publishDate = req.body.publishDate || news.publishDate.toISOString().split('T')[0];
  let publishTime = req.body.publishTime || news.publishDate.toISOString().split('T')[1].slice(0, 5);

  let tags = req.body.tags;
  if (Array.isArray(tags)) {
    tags = tags.map(tag => tag.trim()); 
  } else if (typeof tags === 'string') {
    tags = tags.split(',').map(tag => tag.trim()); 
  } else {
    tags = news.tags; 
  }

  let newsData = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    category: req.body.category,
    email: req.body.email,
    publishDate: new Date(`${publishDate}T${publishTime}`),
    status: req.body.status,
    tags
  };

  const file = req.file;

  if (file) {
    if (news.image && news.image.public_id) {
      await cloudinary.v2.uploader.destroy(news.image.public_id);
    }

    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'Blendko/news',
    });

    newsData.image = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    fs.unlinkSync(file.path);
  }

  news = await News.findByIdAndUpdate(req.params.id, newsData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    news,
  });
});


// Delete News  
exports.deleteNews = catchAsyncErrors(async (req, res, next) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    return next(new ErrorHandler('News not found', 404));
  }

  if (news.image && news.image.public_id) {
    await cloudinary.v2.uploader.destroy(news.image.public_id);
  }
 
  await News.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: 'News is deleted.'
  })
})