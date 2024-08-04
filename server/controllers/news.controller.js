const News = require('../models/news.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

// Create new news  
exports.createNews = catchAsyncErrors(async (req, res, next) => {
    let newsData = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      tags: req.body.tags
    };
  
    if (req.body.image) {
      const result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: 'news'
      });
  
      newsData.image = {
        public_id: result.public_id,
        url: result.secure_url
      };
    }
  
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
      news
    });
  });

// Get single news details 
exports.getSingleNews = catchAsyncErrors(async (req, res, next) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    return next(new ErrorHandler('News not found', 404));
  }

  res.status(200).json({
    success: true,
    news
  })
})

// Update News
exports.updateNews = catchAsyncErrors(async (req, res, next) => {
  let news = await News.findById(req.params.id);

  if (!news) {
    return next(new ErrorHandler('News not found', 404));
  }

  if (req.body.images) {
    for (let i = 0; i < news.images.length; i++) {
      await cloudinary.v2.uploader.destroy(news.images[i].public_id)
    }

    let imagesLinks = [];
    const images = req.body.images;

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'news'
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url
      })
    }

    req.body.image = imagesLinks[0];
  }

  news = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    news
  })
})

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