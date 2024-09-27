const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/order.model');
const User = require('../models/user.model');
const Inbox = require('../models/inbox.model');
const sendEmail = require('../utils/sendEmail');

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  console.log('stripe controller called')
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    try {
      const user = await User.findById(paymentIntent.metadata.userId);
      
      if (!user) {
        throw new Error('User not found');
      }

  
      const order = new Order({
        user: user._id,
        orderItems: JSON.parse(paymentIntent.metadata.cartItems),
        totalPrice: paymentIntent.amount / 100, 
        paidAt: new Date(),
        paymentInfo: {
          id: paymentIntent.id,
          status: paymentIntent.status,
        },
      });

      await order.save();

   
      await Inbox.create({
        user: user._id,
        title: 'Order Placed',
        content: `Your order no. #${order.orderNumber} has been placed successfully. We will notify you once it is shipped.`,
        orderId: order._id
      });


      await sendEmail({
        email: user.email,
        subject: 'Order Confirmation',
        message: `Your order no. #${order.orderNumber} has been placed successfully. We will notify you once it is shipped.`
      });

  
      user.cart = [];
      user.order.push(order._id);
      await user.save({ validateBeforeSave: false });

      console.log('Order created successfully');
    } catch (error) {
      console.error('Error processing webhook:', error);
    }
  }

  res.json({ received: true });
};