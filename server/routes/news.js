const express = require('express');
const router = express.Router();

const {
  getNews,
  getSingleNews,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/news.controller');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.get('/', getNews);
router.get('/:id', getSingleNews);

router.post('/new', isAuthenticatedUser, authorizeRoles('admin'), createNews);
router.put('/:id', isAuthenticatedUser, authorizeRoles('admin'), updateNews);
router.delete('/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteNews);

module.exports = router;