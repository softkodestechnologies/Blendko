const { Router } = require('express');

const {
    makePayment
} = require('../controllers/payment.controller');

const { isAuthenticatedUser} = require('../middlewares/auth');

const router = Router();

router.post('/', isAuthenticatedUser, makePayment);

module.exports = router;