const { Router } = require('express');

const categoryRoutes = require('./category');
const orderRoutes = require('./order');
const productRoutes = require('./product');
const userRoutes = require('./user');
const discountRoutes = require('./discount');
const dashboardRoutes = require('./dashboard');
const imageRoutes = require('./imageColoring');
const router = Router();



router.use('/categories', categoryRoutes);
router.use('/order', orderRoutes);
router.use('/product', productRoutes);
router.use('/', userRoutes);
router.use('/discounts', discountRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/image', imageRoutes);


module.exports = router;