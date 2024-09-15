const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const Inbox = require('../models/inbox.model');
const sendEmail = require('../utils/sendEmail');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    type,
    pickupInfo,
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const foundUser = await User.findById(req.user.id).populate('cart.product');

  const order = new Order({
    type,
    pickupInfo,
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user.id,
    paidAt: Date.now(),
  });

  await order.save();

  await Inbox.create({
    user: req.user.id,
    title: 'Order Placed',
    content: `Your order no.${order._id} has been placed successfully. We will notify you once it is shipped.`,
    orderId: order._id
  });

  await sendEmail({
    email: foundUser.email,
    subject: 'Order Confirmation',
    message: `Your order no.${order._id} has been placed successfully. We will notify you once it is shipped.`
  });

  foundUser.cart = [];
  foundUser.order.push(order._id);

  await foundUser.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    order,
  });
});

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('No Order found with this ID', 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = req.query.pp || 5;
  const last30Days = Date.now() - 30 * 24 * 60 * 60 * 1000;

  const ordersCount = await Order.countDocuments();

  const ordersCountLast30Days = await Order.countDocuments({
    createdAt: { $gte: last30Days },
  });

  const deliveredOrdersCount = await Order.countDocuments({
    orderStatus: 'Delivered',
  });
  const pendingOrdersCount = await Order.countDocuments({
    orderStatus: 'Processing',
  });

  const sumOfAllOrders = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$totalPrice' },
      },
    },
  ]);

  const apiFeatures = new ApiFeatures(
    Order.find()
      .populate('user', 'name') 
      .sort({ createdAt: -1 }),
    req.query
  )
    .search()
    .filter()
    .pagination(resPerPage);

  const orders = await apiFeatures.query;

  res.status(200).json({
    success: true,
    orders,
    total_orders: ordersCount,
    new_orders: ordersCountLast30Days,
    cleared_orders: deliveredOrdersCount,
    pending_orders: pendingOrdersCount,
    sum_of_all_orders: sumOfAllOrders[0].total,
  });
});

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order', 400));
  }

  for (let i = 0; i < order.orderItems.length; i++) {
    const product = await Product.findById(order.orderItems[i].product);

    product.available_quantity -= order.orderItems[i].quantity;

    await product.save({ validateBeforeSave: false });
  }

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  if (order.orderStatus === 'Delivered') {
    await Inbox.create({
      user: order.user,
      title: 'Order Delivered',
      content: `Your order no.${order._id} has been delivered. Thank you for shopping with us!`,
      orderId: order._id
    });

    await sendEmail({
      email: order.user.email,
      subject: 'Order Delivered',
      message: `Your order no.${order._id} has been delivered. Thank you for shopping with us!`
    });
  }

  res.status(200).json({
    success: true,
  });
});

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  const user = await User.findById(order.user);

  if (!order || !user) {
    return next(new ErrorHandler('No Order found with this ID', 404));
  }

  await Order.findByIdAndDelete(req.params.id);
  user.order.splice(user.order.indexOf(req.params.id), 1);

  await user.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});