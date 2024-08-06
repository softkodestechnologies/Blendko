const Chat = require('../models/chat.model');
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new chat
exports.createChat = catchAsyncErrors(async (req, res, next) => {
  const { message } = req.body;
  const userId = req.user._id;

  const chat = await Chat.create({
    user: userId,
    messages: [{ sender: userId, content: message }]
  });

  // Emit event for new chat
  req.io.emit('new chat', chat);

  res.status(201).json({
    success: true,
    chat
  });
});

// Get all chats for admin
exports.getAllChats = catchAsyncErrors(async (req, res, next) => {
  const chats = await Chat.find().populate('user', 'name email').sort('-updatedAt');

  res.status(200).json({
    success: true,
    chats
  });
});

// Get user's chats
exports.getUserChats = catchAsyncErrors(async (req, res, next) => {
  const chats = await Chat.find({ user: req.user._id }).sort('-updatedAt');

  res.status(200).json({
    success: true,
    chats
  });
});

// Get a single chat
exports.getChat = catchAsyncErrors(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id).populate('user', 'name email').populate('admin', 'name email');

  if (!chat) {
    return next(new ErrorHandler('Chat not found', 404));
  }

  res.status(200).json({
    success: true,
    chat
  });
});

// Add message to chat
exports.addMessage = catchAsyncErrors(async (req, res, next) => {
  const { message } = req.body;
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ErrorHandler('Chat not found', 404));
  }

  const newMessage = { sender: req.user._id, content: message };
  chat.messages.push(newMessage);
  chat.updatedAt = Date.now();

  if (req.user.role.includes('admin') && chat.status === 'open') {
    chat.status = 'in_progress';
    chat.admin = req.user._id;
  }

  await chat.save();


  req.io.to(req.params.id).emit('new message', { chatId: req.params.id, message: newMessage });

  res.status(200).json({
    success: true,
    chat
  });
});

// Update chat status
exports.updateChatStatus = catchAsyncErrors(async (req, res, next) => {
  const { status } = req.body;
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ErrorHandler('Chat not found', 404));
  }

  chat.status = status;
  await chat.save();


  req.io.to(req.params.id).emit('chat status', { chatId: req.params.id, status });

  res.status(200).json({
    success: true,
    chat
  });
});