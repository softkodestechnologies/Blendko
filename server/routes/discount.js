const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const {
  createDiscount,
  getAllDiscounts,
  getDiscount,
  updateDiscount,
  deleteDiscount
} = require('../controllers/discount.controller');

router.post('/new', isAuthenticatedUser, authorizeRoles('admin'), createDiscount);
router.get('/', isAuthenticatedUser, authorizeRoles('admin'), getAllDiscounts);
router.get('/:id', isAuthenticatedUser, authorizeRoles('admin'), getDiscount);
router.put('/:id', isAuthenticatedUser, authorizeRoles('admin'), updateDiscount);
router.delete('/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteDiscount);

module.exports = router;