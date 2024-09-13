const express = require('express');
const router = express.Router();

const {
  getInboxMessages,
  markMessageAsRead,
} = require('../controllers/inbox.controller');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/messages').get(isAuthenticatedUser, getInboxMessages);
router.route('/messages/:id').put(isAuthenticatedUser, markMessageAsRead);

module.exports = router;