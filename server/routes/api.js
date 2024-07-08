const { Router } = require('express');

const categoryRoutes = require('./category');
const orderRoutes = require('./order');
const productRoutes = require('./product');
const userRoutes = require('./user');
const dashboardRoutes = require('./dashboard');
const router = Router();



router.use('/categories', categoryRoutes);
router.use('/order', orderRoutes);
router.use('/product', productRoutes);
router.use('/', userRoutes);
router.use('/discounts', discountRoutes);
router.use('/dashboard', dashboardRoutes);


module.exports = router;