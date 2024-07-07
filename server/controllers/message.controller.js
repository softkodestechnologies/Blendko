const Message = require('../models/message.model');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.getUserMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find({ user: req.user.id }).sort('-createdAt');
  res.status(200).json({ success: true, messages });
});

exports.createMessage = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const message = await Message.create(req.body);
  res.status(201).json({ success: true, message });
});

exports.deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const message = await Message.findById(req.params.id);
  if (!message) return next(new ErrorHandler('Message not found', 404));
  if (message.user.toString() !== req.user.id) return next(new ErrorHandler('Not authorized to delete this message', 403));
  await message.remove();
  res.status(200).json({ success: true, message: 'Message deleted successfully' });
});