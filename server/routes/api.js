const { Router } = require('express');

orderRoutes = require('./order');


const router = Router();


router.use('/order', orderRoutes);


module.exports = router;