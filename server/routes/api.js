const { Router } = require('express');

const categoryRoutes = require('./category');
const orderRoutes = require('./order');


const router = Router();


router.use('/categories', categoryRoutes);
router.use('/order', orderRoutes);


module.exports = router;