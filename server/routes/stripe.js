
const { Router } = require('express');

const { stripeWebhook } = require('../controllers/stripe.controller');

const router = Router();

router.post('/', stripeWebhook);

module.exports = router;