const Stripe = require('stripe');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const User = require('../models/user.model');

exports.makePayment = catchAsyncErrors(async (req, res, next) => {
  const { items, amount, currency, metadata } = req.body;  
  console.log('payment controller called')
  const userId = metadata.userId;

  const user = await User.findbyId(userId);

  if(!user) {
    return res.status(404).json({message: 'User not found'});
  }

  const pointsToRedeem = Math.floor(user.points / 500) * 500;
  const discountAmount = pointsToRedeem / 500;

  const totalAmount = Math.round((amount - discountAmount) * 100);

  if(totalAmount < 0) {
    return res.status(400).json({ message: 'Invalid payment amount after applying loyalty points'})
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: metadata,
      pointsRedeemed: pointsToRedeem,
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
