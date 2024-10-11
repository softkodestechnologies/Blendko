const express = require('express');
const router = express.Router();
const { upload } = require('../utils/multer');
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

router.post('/new', isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), upload.single('image'),  createNews);
router.put('/:id', isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), upload.single('image'),  updateNews);
router.delete('/:id', isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), deleteNews);

module.exports = router;