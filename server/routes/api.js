const { Router } = require('express');

const userRoutes = require('./user');


const router = Router();


router.use('/', userRoutes)


module.exports = router;