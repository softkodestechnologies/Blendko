const { Router } = require('express');

const categoryRoutes = require('./category');


const router = Router();


router.use('/categories', categoryRoutes);


module.exports = router;