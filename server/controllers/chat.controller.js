const Chat = require('../models/chat.model');
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new chat
exports.createChat = catchAsyncErrors(async (req, res, next) => {
  const { message } = req.body;
  const userId = req.user._id;

  let chat = await Chat.findOne({
    participants: { $all: [userId] },
    status: 'open'
  });

  if (!chat) {
    chat = await Chat.create({
      participants: [userId],
      messages: [{ sender: userId, content: message }]
    });
    
    req.io.emit('newChat', chat);
  } else {
    chat.messages.push({ sender: userId, content: message });
    await chat.save();
  }

  req.io.to(chat._id.toString()).emit('newMessage', { chatId: chat._id, message: { sender: userId, content: message } });

  res.status(201).json({
    success: true, 
    chat
  });
});

// Get all chats for admin
exports.getAllChats = catchAsyncErrors(async (req, res, next) => {
  const chats = await Chat.find().populate('participants', 'name email').sort('-updatedAt');

  res.status(200).json({
    success: true,
    chats
  });
});

// Get user's chats
exports.getUserChats = catchAsyncErrors(async (req, res, next) => {
  const chats = await Chat.find({ participants: req.user._id }).sort('-updatedAt');

  res.status(200).json({
    success: true,
    chats
  });
});

// Get a single chat
exports.getChat = catchAsyncErrors(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id)
    .populate('participants', 'name email')
    .populate('messages.sender', 'name email');

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

  if (req.user.role.includes('admin') && !chat.participants.includes(req.user._id)) {
      chat.participants.push(req.user._id);
  }

  await chat.save();

  req.io.to(chat._id.toString()).emit('newMessage', { chatId: chat._id, message: newMessage });

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

// Close chat
exports.closeChat = catchAsyncErrors(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ErrorHandler('Chat not found', 404));
  }

  chat.status = 'closed';
  await chat.save();

  req.io.to(chat._id.toString()).emit('chatClosed', chat._id);

  res.status(200).json({
    success: true,
    message: 'Chat closed successfully'
  });
});
