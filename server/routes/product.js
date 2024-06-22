const { Router } = require('express');

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require('../controllers/product.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const upload = require('../utils/multer');

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/review/:id', isAuthenticatedUser, createProductReview);
router.get('/reviews/:id', isAuthenticatedUser, getProductReviews);
router.delete('/reviews', isAuthenticatedUser, deleteReview);

router.post(
  '/admin/new',
  upload.array('images'),
  isAuthenticatedUser,
  authorizeRoles('admin'),
  createProduct
);
router.put(
  '/admin/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  updateProduct
);
router.delete(
  '/admin/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  deleteProduct
);

module.exports = router;