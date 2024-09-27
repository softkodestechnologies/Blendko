const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { createChat, createGuestChat, getAllChats, getChat, addMessage, updateChatStatus, closeChat } = require('../controllers/chat.controller');


router.route('/chat/guest').post(createGuestChat);


router.route('/').post(isAuthenticatedUser, createChat);
router.route('/admin').get(isAuthenticatedUser, authorizeRoles('admin'), getAllChats);
router.route('/:id').get(isAuthenticatedUser, getChat);
router.route('/:id/message').post(addMessage);
router.route('/:id/status').patch(isAuthenticatedUser, authorizeRoles('admin'), updateChatStatus);
router.route('/:id/close').patch(isAuthenticatedUser, authorizeRoles('admin'), closeChat);

module.exports = router;