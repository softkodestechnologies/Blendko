const { Router } = require('express');

const categoryRoutes = require('./category');
const orderRoutes = require('./order');
const productRoutes = require('./product');
const userRoutes = require('./user');
const discountRoutes = require('./discount');
const dashboardRoutes = require('./dashboard');
const deliveryAddressRoutes = require('./deliveryAddress');
const newsRoutes = require('./news');
const inboxRoutes = require('./inbox');
const jobRoutes = require('./job');
const chatRoutes = require('./chat');
const router = Router();



router.use('/categories', categoryRoutes);
router.use('/order', orderRoutes);
router.use('/product', productRoutes);
router.use('/', userRoutes);
router.use('/discounts', discountRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/delivery-address', deliveryAddressRoutes);
router.use('/news', newsRoutes);
router.use('/inbox', inboxRoutes);
router.use('/jobs', jobRoutes);
router.use('/chat', chatRoutes);

module.exports = router;