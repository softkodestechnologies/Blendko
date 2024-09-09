const { Router } = require('express');
const router = Router();

const {
  createDeliveryAddress,
  getDeliveryAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress
} = require('../controllers/deliveryAddress.controller');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/')
  .post(isAuthenticatedUser, createDeliveryAddress)
  .get(isAuthenticatedUser, getDeliveryAddress)
  .put(isAuthenticatedUser, updateDeliveryAddress)
  .delete(isAuthenticatedUser, deleteDeliveryAddress);

module.exports = router;