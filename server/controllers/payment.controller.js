const Stripe = require('stripe');
const Order = require('../models/order.model');
const User = require('../models/user.model');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.makePayment = catchAsyncErrors(async (req, res, next) => {
    const { amount, currency, paymentMethodId, orderId } = req.body;

    try {
       
        const order = await Order.findById(orderId);

        if (!order) {
            return next(new ErrorHandler('Order not found', 404));
        }

  
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

   
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, 
            currency: currency,
            payment_method: paymentMethodId,
            confirm: true,
            description: `Payment for order ${order._id} by user: ${user.email}`,
        });

    
        order.paymentInfo = {
            id: paymentIntent.id,
            status: paymentIntent.status,
        };
        order.paidAt = Date.now();
        await order.save();

     
        user.cart = [];
        await user.save({ validateBeforeSave: false });


        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            orderId: order._id,
        });

    } catch (error) {
        console.error('Error making payment:', error);
        return next(new ErrorHandler('Error processing payment', 500));
    }
});
