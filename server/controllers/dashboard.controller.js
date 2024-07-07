const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.getDashboardData = catchAsyncErrors(async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, total: { $sum: '$totalPrice' } } }
  ]);

  const totalOrders = await Order.countDocuments();
  
  const totalProfits = await Order.aggregate([
    { $group: { _id: null, total: { $sum: '$profit' } } }
  ]);

  const discountedAmount = await Order.aggregate([
    { $group: { _id: null, total: { $sum: '$discountAmount' } } }
  ]);

  const salesByCountry = await Order.aggregate([
    { $group: { _id: '$shippingInfo.country', sales: { $sum: '$totalPrice' } } },
    { $sort: { sales: -1 } },
    { $limit: 5 }
  ]);

  const topSellingCategories = await Product.aggregate([
    { $group: { _id: '$category', total: { $sum: '$soldCount' } } },
    { $sort: { total: -1 } },
    { $limit: 5 }
  ]);

  const trendingProducts = await Product.find().sort({ soldCount: -1 }).limit(5);

  const bestSellingProducts = await Product.find().sort({ soldCount: -1 }).limit(10);

  const todayOrders = await Order.find({
    createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
  }).countDocuments();

  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10);

  res.status(200).json({
    success: true,
    totalSales: totalSales[0]?.total || 0,
    totalOrders,
    totalProfits: totalProfits[0]?.total || 0,
    discountedAmount: discountedAmount[0]?.total || 0,
    salesByCountry,
    topSellingCategories,
    trendingProducts,
    bestSellingProducts,
    todayOrders,
    recentOrders
  });
});


exports.getReports = catchAsyncErrors(async (req, res) => {
    const customersCount = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const stockProducts = await Product.countDocuments({ quantity: { $gt: 0 } });
    const outOfStockProducts = await Product.countDocuments({ quantity: 0 });
    const revenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
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