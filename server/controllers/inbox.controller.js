const Inbox = require('../models/inbox.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


exports.getInboxMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Inbox.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .populate('orderId', 'orderItems')
    .populate('productId', 'name images');

  res.status(200).json({
    success: true,
    messages,
  });
});


exports.markMessageAsRead = catchAsyncErrors(async (req, res, next) => {
  const message = await Inbox.findById(req.params.id);

  if (!message) {
    return next(new ErrorHandler('Message not found', 404));
  }

  if (message.user.toString() !== req.user.id) {
    return next(new ErrorHandler('Not authorized to access this message', 403));
  }

  message.read = true;
  await message.save();

  res.status(200).json({
    success: true,
    message: 'Message marked as read',
  });
});