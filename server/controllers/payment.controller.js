const Stripe = require('stripe');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.makePayment = catchAsyncErrors(async (req, res, next) => {
  const { items, amount, currency, metadata } = req.body;  
  console.log('payment controller called')

  const totalAmount = Math.round(amount * 100);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: metadata,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status
    });
  } catch (error) {
    console.error('Error creating payment intent:', error.message, error.stack, error.raw);
    res.status(500).send({ error: 'Payment failed', details: error.message });
  }
});
