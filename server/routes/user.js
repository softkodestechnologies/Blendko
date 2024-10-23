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
  getAllAdmins,
  getUserDetails,
  updateUserRole,
  deleteUser,
  getCartItems,
  addToCart,
  removeFromCart,
  deleteCartItem,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  googleLogin,
  googleRegister,
  createAdmin,
  updateAdmin,
  updateAdminStatus,
  deleteAdmin,
  getPoints, 
  getReferrals, 
  updateReferralCode, 
  joinLoyaltyProgram 
} = require('../controllers/user.controller');

const { getUserMessages, createMessage, deleteMessage } = require('../controllers/message.controller');

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
router.route('/cart').post(isAuthenticatedUser, addToCart);
router.route('/cart').get(isAuthenticatedUser, getCartItems);
router.route('/cart/:id').patch(isAuthenticatedUser, removeFromCart);
router.route('/cart/:id').delete(isAuthenticatedUser, deleteCartItem);


router.route('/wishlist').get(isAuthenticatedUser, getWishlist);
router.route('/wishlist/add').post(isAuthenticatedUser, addToWishlist);
router.route('/wishlist/remove').post(isAuthenticatedUser, removeFromWishlist);



router.get('/messages', isAuthenticatedUser, getUserMessages);
router.post('/messages', isAuthenticatedUser, createMessage);
router.delete('/messages/:id', isAuthenticatedUser, deleteMessage);

router.route('/points').get(isAuthenticatedUser, getPoints);
router.route('/referrals').get(isAuthenticatedUser, getReferrals);
router.route('/referral-code').put(isAuthenticatedUser, updateReferralCode);
router.route('/join-loyalty').post(isAuthenticatedUser, joinLoyaltyProgram);


router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), getAllUsers);

router
  .route('/admin/admins')
  .get(isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), getAllAdmins);

router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), deleteUser);
//I added admin to auth roles for testing
router
  .route('/admin/create')
  .post(isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), createAdmin);

router
  .route('/admin/update/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), updateAdmin);

  router
  .route('/admin/update/status/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), updateAdminStatus);

router
  .route('/admin/delete/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), deleteAdmin);
module.exports = router;