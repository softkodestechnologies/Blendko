const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
  getCartItems,
  addToCart,
  removeFromCart,
  deleteCartItem,
  googleLogin,
  googleRegister,
} = require('../controllers/user.controller');

const { getUserMessages, createMessage, deleteMessage } = require('../controllers/message.controller');

const {
  generateReferralCode,
  applyReferralCode,
  getReferralDiscount,
} = require('../controllers/loyalty.controller');


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/googleregister').post(googleRegister);
router.route('/login').post(loginUser);
router.route('/googlelogin').post(googleLogin);
router.route('/logout').get(logoutUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/cart').post(isAuthenticatedUser, addToCart)
router.route('/cart').get(isAuthenticatedUser, getCartItems)
router.route('/cart/:id').patch(isAuthenticatedUser, removeFromCart)
router.route('/cart/:id').delete(isAuthenticatedUser, deleteCartItem)



router.get('/messages', isAuthenticatedUser, getUserMessages);
router.post('/messages', isAuthenticatedUser, createMessage);
router.delete('/messages/:id', isAuthenticatedUser, deleteMessage);


router.get('/referral/generate', isAuthenticatedUser, generateReferralCode);
router.post('/referral/apply', isAuthenticatedUser, applyReferralCode);
router.get('/referral/discount', isAuthenticatedUser, getReferralDiscount);

router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);

router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
