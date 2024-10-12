const Chat = require('../models/chat.model');
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const mongoose = require('mongoose');
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
  console.log('Request Body', req.body)
  console.log('User Id', req.user._id)

  let chat = await Chat.findOne({
    participants: { $all: [userId] },
    status: 'open',
  });

  console.log('Chat', chat)

  if (!chat) {
    chat = await Chat.create({
      participants: [userId],
      messages: [{ sender: userId, content: message, isAdmin: false }],
    });
    req.io.emit('newChat', chat);
  } else {
    chat.messages.push({ sender: userId, content: message, isAdmin: false });
    await chat.save();
  }

  req.io.to(chat._id.toString()).emit('newMessage', {
    chatId: chat._id,
    message: { sender: userId, content: message, isAdmin: false },
  });

  console.log('chat after thought', chat)

  res.status(201).json({
    success: true,
    chat,
  });
});

// Create a new chat for guest users
exports.createGuestChat = catchAsyncErrors(async (req, res, next) => {
  const { message, name, email, phone } = req.body;
  const guestId = nanoid();
  console.log('Guest user function initiated')
  console.log('Request Body', req.body)
  console.log('guest id', guestId);

  const chat = await Chat.create({
    guestId,
    guestInfo: { name, email, phone },
    participants: [guestId],
    messages: [{ sender: guestId, content: message, isAdmin: false }],
  });
  console.log('Guest chat created', chat)

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


exports.addMessage = catchAsyncErrors(async (req, res, next) => {
  const { message, guestId } = req.body;
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);
  if (!chat) {
    console.error('Chat not found:', chatId);
    return next(new ErrorHandler('Chat not found', 404));
  }

  let messageSender;
  let isAdmin = false;

  if (req.user) {
    messageSender = req.user._id;
    isAdmin = req.user.role.includes('admin');
  } else if (guestId && chat.guestId === guestId) {
    messageSender = guestId;
  } else {
    return next(new ErrorHandler('Invalid sender', 400));
  }

  const newMessage = { sender: messageSender, content: message, isAdmin };
  chat.messages.push(newMessage);
  chat.updatedAt = Date.now();

  if (isAdmin && !chat.participants.includes(req.user._id.toString())) {
    chat.participants.push(req.user._id);
  }

  if (chat.participants.length > 2) {
    chat.participants = [chat.participants[0], req.user._id]; 
  }

  await chat.save();

  const populatedChat = await Chat.findById(chatId)
    .populate('participants', 'name email')
    .populate('messages.sender', 'name email');

  req.io.to(chat._id.toString()).emit('newMessage', {
    chatId: chat._id,
    message: newMessage,
  });

  res.status(200).json({
    success: true,
    chat: populatedChat,
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

  req.io.to(req.params.id).emit('chatStatusUpdated', {
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

// Get all chats (admin only)
exports.getAllChats = catchAsyncErrors(async (req, res, next) => {
  if (!req.user || !req.user.role.includes('admin')) {
    return next(new ErrorHandler('Access denied. Admins only.', 403));
  }

  const chats = await Chat.aggregate([
    {
      $sort: { updatedAt: -1 }
    },
    {
      $addFields: {
        participantIds: {
          $filter: {
            input: '$participants',
            as: 'participant',
            cond: { $eq: [{ $type: '$$participant' }, 'objectId'] }
          }
        }
      }
    }
  ]);

  if (!chats || chats.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No chats found',
    });
  }

  // Collect all unique user IDs
  const userIds = [...new Set(chats.flatMap(chat => chat.participantIds))];

  // Fetch user details in bulk
  const users = await User.find({ _id: { $in: userIds } }, 'name email');
  const userMap = new Map(users.map(user => [user._id.toString(), user]));

  // Enhance chat objects with user details
  const enhancedChats = chats.map(chat => ({
    ...chat,
    participants: chat.participants.map(participant => {
      if (mongoose.Types.ObjectId.isValid(participant)) {
        const user = userMap.get(participant.toString());
        return user ? { _id: user._id, name: user.name, email: user.email } : participant;
      }
      return { _id: participant, name: chat.guestInfo?.name || 'Guest', email: chat.guestInfo?.email };
    }),
    messages: chat.messages.map(message => ({
      ...message,
      sender: mongoose.Types.ObjectId.isValid(message.sender)
        ? userMap.get(message.sender.toString()) || message.sender
        : { _id: message.sender, name: chat.guestInfo?.name || 'Guest', email: chat.guestInfo?.email }
    }))
  }));

  res.status(200).json({
    success: true,
    chats: enhancedChats,
  });
});

// Get a single chat
exports.getChat = catchAsyncErrors(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ErrorHandler('Chat not found', 404));
  }

  const participantIds = chat.participants.filter(p => mongoose.Types.ObjectId.isValid(p));
  const users = await User.find({ _id: { $in: participantIds } }, 'name email');
  const userMap = new Map(users.map(user => [user._id.toString(), user]));

  const enhancedChat = {
    ...chat.toObject(),
    participants: chat.participants.map(participant => {
      if (mongoose.Types.ObjectId.isValid(participant)) {
        const user = userMap.get(participant.toString());
        return user ? { _id: user._id, name: user.name, email: user.email } : participant;
      }
      return { _id: participant, name: chat.guestInfo?.name || 'Guest', email: chat.guestInfo?.email };
    }),
    messages: chat.messages.map(message => ({
      ...message.toObject(),
      sender: mongoose.Types.ObjectId.isValid(message.sender)
        ? userMap.get(message.sender.toString()) || message.sender
        : { _id: message.sender, name: chat.guestInfo?.name || 'Guest', email: chat.guestInfo?.email }
    }))
  };

  res.status(200).json({
    success: true,
    chat: enhancedChat,
  });
});