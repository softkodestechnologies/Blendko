const { Router } = require('express');
const router = Router();

const {
  createChat,
  getAllChats,
  getUserChats,
  getChat,
  addMessage,
  updateChatStatus,
  closeChat
} = require('../controllers/chat.controller');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.post('/', isAuthenticatedUser, createChat);
router.get('/all', isAuthenticatedUser, authorizeRoles('admin'), getAllChats);
router.get('/user', isAuthenticatedUser, getUserChats);
router.route('/:id')
  .get(isAuthenticatedUser, getChat)
  .post(isAuthenticatedUser, addMessage)
  .patch(isAuthenticatedUser, authorizeRoles('admin'), updateChatStatus);
router.patch('/:id/close', isAuthenticatedUser, authorizeRoles('admin'), closeChat);

module.exports = router;