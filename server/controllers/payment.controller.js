const Stripe = require('stripe');
const Order = require('../models/order.model');
const User = require('../models/user.model');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
require('dotenv').config();


const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.makePayment = catchAsyncErrors(async (req, res, next) => {
    const { items, amount, currency, paymentMethodId } = req.body;
    
    const totalAmount = Math.round(amount * 100);
    
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: currency,
        payment_method: paymentMethodId,
        confirmation_method: 'manual',
        confirm: true,
        return_url: `${process.env.CLIENT_URL}/success`, 
      });
      
      res.send({ 
        clientSecret: paymentIntent.client_secret,
        status: paymentIntent.status,
        id: paymentIntent.id
      });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).send({ error: 'Payment failed' });
    }
  });

