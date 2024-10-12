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
const { uploadMultiple } = require('../utils/multer');

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/review/:id', isAuthenticatedUser, createProductReview);
router.get('/reviews/:id', isAuthenticatedUser, getProductReviews);
router.delete('/reviews', isAuthenticatedUser, deleteReview);

router.post(
  '/admin/new',
  uploadMultiple,
  isAuthenticatedUser,
  authorizeRoles('admin', 'super-admin'),
  createProduct
);
router.put(
  '/admin/:id',
  isAuthenticatedUser,
  authorizeRoles('admin', 'super-admin'),
  updateProduct
);
router.delete(
  '/admin/:id',
  isAuthenticatedUser,
  authorizeRoles('admin', 'super-admin'),
  deleteProduct
);

module.exports = router;