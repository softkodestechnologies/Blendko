const Chat = require('../models/chat.model');
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

let nanoid;

// Initialize nanoid for guest chat IDs
(async () => {
  const { customAlphabet } = await import('nanoid');
  nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
})();

// Create a new chat (for registered users)
exports.createChat = catchAsyncErrors(async (req, res, next) => {
  const { message } = req.body;
  const userId = req.user._id;

  let chat = await Chat.findOne({
    participants: { $all: [userId] },
    status: 'open',
  });

  if (!chat) {
    chat = await Chat.create({
      participants: [userId],
      messages: [{ sender: userId, content: message }],
    });
    req.io.emit('newChat', chat);
  } else {
    chat.messages.push({ sender: userId, content: message });
    await chat.save();
  }

  req.io.to(chat._id.toString()).emit('newMessage', {
    chatId: chat._id,
    message: { sender: userId, content: message },
  });

  res.status(201).json({
    success: true,
    chat,
  });
});

// Create a new chat for guest users
exports.createGuestChat = catchAsyncErrors(async (req, res, next) => {
  const { message, name, email, phone } = req.body;
  const guestId = nanoid();

  const chat = await Chat.create({
    guestId,
    guestInfo: { name, email, phone },
    messages: [{ sender: guestId, content: message }],
  });

  req.io.emit('newChat', chat);
  req.io.to(chat._id.toString()).emit('newMessage', {
    chatId: chat._id,
    message: { sender: guestId, content: message },
  });

  res.status(201).json({
    success: true,
    chat,
    guestId,
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
    chat,
  });
});

// Add message to chat (for both registered and guest users)
exports.addMessage = catchAsyncErrors(async (req, res, next) => {
  const { message } = req.body;
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ErrorHandler('Chat not found', 404));
  }
  //Not authenticated yet, send user id.

  // Determine the sender
  const sender = req.user ? req.user._id : (req.body.guestId || chat.guestId);
  console.log('chat guest id', chat.guestId)
  console.log('Request body', req.body);
  console.log('User', req.user)
  console.log(sender)
  // Check if sender exists
  if (!sender) {
    return next(new ErrorHandler('Sender is required', 400));
  }

  const newMessage = { sender, content: message };
  chat.messages.push(newMessage);
  chat.updatedAt = Date.now();

  if (req.user && req.user.role.includes('admin') && !chat.participants.includes(req.user._id)) {
    chat.participants.push(req.user._id);
  }

  await chat.save();

  req.io.to(chat._id.toString()).emit('newMessage', {
    chatId: chat._id,
    message: newMessage,
  });

  res.status(200).json({
    success: true,
    chat,
  });
});

// Get all chats (admin only)
exports.getAllChats = catchAsyncErrors(async (req, res, next) => {
  if (!req.user || !req.user.role.includes('admin')) {
    return next(new ErrorHandler('Access denied. Admins only.', 403));
  }

  const chats = await Chat.find()
    .populate('participants', 'name email')
    .populate('messages.sender', 'name email')
    .sort({ updatedAt: -1 });

  if (!chats || chats.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No chats found',
    });
  }

  res.status(200).json({
    success: true,
    chats,
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

  req.io.to(req.params.id).emit('chat status', {
    chatId: req.params.id,
    status,
  });

  res.status(200).json({
    success: true,
    chat,
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
    message: 'Chat closed successfully',
  });
});
