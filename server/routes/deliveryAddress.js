const { Router } = require('express');
const router = Router();

const {
  createOrUpdateDeliveryAddress,
  getDeliveryAddress,
  deleteDeliveryAddress
} = require('../controllers/deliveryAddress.controller');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/')
  .post(isAuthenticatedUser, createOrUpdateDeliveryAddress)
  .get(isAuthenticatedUser, getDeliveryAddress)
  .delete(isAuthenticatedUser, deleteDeliveryAddress);

module.exports = router;