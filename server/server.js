const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const Chat = require('./models/chat.model');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connectDatabase = require('./config/db');
const errorMiddleware = require('./middlewares/errors');
const corsOptions = require('./config/origin');
const api = require('./routes/api');

dotenv.config();

connectDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions()));

const server = http.createServer(app);


const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST", "PATCH"], 
    allowedHeaders: ['Content-Type', 'Authorization']
  }
});

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error('Authentication error'));
        }
        socket.decoded = decoded;
        next();
    });
}).on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join chat', (chatId) => {
    socket.join(chatId);
    console.log(`Client joined chat: ${chatId}`);
  });

  socket.on('leave chat', (chatId) => {
    socket.leave(chatId);
    console.log(`Client left chat: ${chatId}`);
  });

  socket.on('sendMessage', async ({ chatId, message }) => {
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            console.error('Chat not found:', chatId);
            socket.emit('error', { message: 'Chat not found' });
            return;
        }
        const newMessage = { sender: socket.decoded.id, content: message };
        chat.messages.push(newMessage);
        await chat.save();
        io.to(chatId).emit('newMessage', { chatId, message: newMessage });
    } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('error', { message: 'Failed to save message' });
    }
});

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/v1', api);
app.use(errorMiddleware);


process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Uncaught Exception');

  process.exit(1);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on PORT ${process.env.PORT || 3000}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');

  server.close(() => process.exit(1));
});