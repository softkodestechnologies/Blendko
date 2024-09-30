const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const Category = require('../models/category.model');
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

  const totalVisitors = await User.countDocuments();

  const topSellingCategories = await Category.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'category',
        as: 'products'
      }
    },
    {
      $project: {
        name: 1,
        sales: { $sum: '$products.price' }
      }
    },
    { $sort: { sales: -1 } },
    { $limit: 3 }
  ]);

  const lastTransactions = await Order.find()
    .sort({ createdAt: -1 })
    .limit(6)
    .select('orderNumber createdAt totalPrice');

  const bestSellingProducts = await Product.aggregate([
    {
      $lookup: {
        from: 'orders',
        localField: '_id',
        foreignField: 'orderItems.product',
        as: 'orders'
      }
    },
    {
      $project: {
        name: 1,
        price: 1,
        quantity: 1,
        totalOrders: { $size: '$orders' }
      }
    },
    { $sort: { totalOrders: -1 } },
    { $limit: 5 }
  ]);

  const trendingProducts = await Product.find()
    .sort({ ratings: -1, num_of_reviews: -1 })
    .limit(4)
    .select('name sku price images');

  const todayOrders = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: today.toDate() }
      }
    },
    {
      $group: {
        _id: { $hour: "$createdAt" },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const todayTotalOrders = todayOrders.reduce((sum, hour) => sum + hour.count, 0);

  const yesterdayOrders = await Order.countDocuments({
    createdAt: {
      $gte: moment(today).subtract(1, 'days').toDate(),
      $lt: today.toDate()
    }
  });

  const orderChangePercentage = ((todayTotalOrders - yesterdayOrders) / yesterdayOrders) * 100;

  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name')
    .select('orderNumber user orderStatus totalPrice');

  const dailyProductData = await Product.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalProducts: { $sum: 1 },
        stockProducts: { $sum: { $cond: [{ $gt: ["$quantity", 0] }, 1, 0] } },
        outOfStockProducts: { $sum: { $cond: [{ $eq: ["$quantity", 0] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.status(200).json({
    success: true,
    dailyData,
    sessionsData,
    salesByCountry,
    recentUsers,
    totalVisitors,
    topSellingCategories,
    lastTransactions,
    bestSellingProducts,
    trendingProducts,
    todayOrders,
    todayTotalOrders,
    orderChangePercentage,
    recentOrders,
    dailyProductData
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