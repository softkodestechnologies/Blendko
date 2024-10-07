const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { createChat, createGuestChat, getAllChats, getChat, addMessage, updateChatStatus, closeChat } = require('../controllers/chat.controller'); 


router.route('/guest').post(createGuestChat);


router.route('/').post(isAuthenticatedUser, createChat);
router.route('/admin').get(isAuthenticatedUser, authorizeRoles('admin'), getAllChats);
router.route('/:id').get((req, res, next) => {
    if (req.headers.authorization) {
      isAuthenticatedUser(req, res, () => getChat(req, res, next));
    } else {
      getChat(req, res, next);
    }
  });

router.route('/:id/message').post((req, res, next) => {
    if (req.headers.authorization) {
      isAuthenticatedUser(req, res, () => addMessage(req, res, next));
    } else {
      addMessage(req, res, next);
    }
  });
  
router.route('/:id/status').patch(isAuthenticatedUser, authorizeRoles('admin'), updateChatStatus);
router.route('/:id/close').patch(isAuthenticatedUser, authorizeRoles('admin'), closeChat);

module.exports = router;