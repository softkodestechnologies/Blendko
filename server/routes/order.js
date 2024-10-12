const { Router } = require('express');
const router = Router();

const {
  myOrders,
  getSingleOrder,
  allOrders,
  updateOrder,
  deleteOrder,
  createOrder,
} = require('../controllers/order.controller');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.post('/new', isAuthenticatedUser, createOrder);
router.get('/myorders', isAuthenticatedUser, myOrders);
router.get('/:id', isAuthenticatedUser, getSingleOrder);

router.get(
  '/admin/all',
  isAuthenticatedUser,
  authorizeRoles('admin', 'super-admin'),
  allOrders
);
router.put(
  '/admin/:id',
  isAuthenticatedUser,
  authorizeRoles('admin', 'super-admin'),
  updateOrder
);
router.delete(
  '/admin/:id',
  isAuthenticatedUser,
  authorizeRoles('admin', 'super-admin'),
  deleteOrder
);

module.exports = router;