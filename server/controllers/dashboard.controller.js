const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const moment = require('moment');

exports.getDashboardData = catchAsyncErrors(async (req, res) => {
  const today = moment().startOf('day');
  const sevenDaysAgo = moment(today).subtract(7, 'days');

  const dailyData = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo.toDate(), $lte: today.toDate() }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        sales: { $sum: '$totalPrice' },
        cost: { $sum: { $ifNull: ['$cost', 0] } },  
        orders: { $sum: 1 },
        profit: { $sum: '$profit' },
        discountedAmount: { $sum: { $ifNull: ['$discountAmount', 0] } } 
      }
    },
    { $sort: { _id: 1 } }
  ]);

  
  
  const sessionsData = await User.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$lastLoginAt" } },
        sessions: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  
  const salesByCountry = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo.toDate(), $lte: today.toDate() }
      }
    },
    {
      $group: {
        _id: '$shippingInfo.country',
        sales: { $sum: '$totalPrice' }
      }
    },
    { $sort: { sales: -1 } },
    { $limit: 5 }
  ]);
  
  const recentUsers = await User.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 30 },
    {
      $group: {
        _id: { $minute: "$createdAt" },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  
  res.status(200).json({
    success: true,
    dailyData,
    sessionsData,
    salesByCountry,
    recentUsers
  });
});


exports.getReports = catchAsyncErrors(async (req, res) => {
  const customersCount = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const stockProducts = await Product.countDocuments({ quantity: { $gt: 0 } });
  const outOfStockProducts = await Product.countDocuments({ quantity: 0 });

  const revenue = await Order.aggregate([
    { 
      $group: { 
        _id: null, 
        total: { $sum: { $ifNull: ['$totalPrice', 0] } }  
      } 
    }
  ]);

  res.status(200).json({
    success: true,
    customersCount,
    totalProducts,
    stockProducts,
    outOfStockProducts,
    revenue: revenue[0]?.total || 0  
  });
});