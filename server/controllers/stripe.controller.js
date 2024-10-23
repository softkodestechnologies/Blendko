const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const DeliveryAddress = require('../models/deliveryAddress.model');
const Inbox = require('../models/inbox.model');
const sendEmail = require('../utils/sendEmail');

exports.stripeWebhook = async (req, res) => {
  console.log('Webhook body:', JSON.stringify(req.body, null, 2));
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    try {
      if (!paymentIntent.metadata || !paymentIntent.metadata.userId) {
        throw new Error('User ID not found in metadata');
      }

      const user = await User.findById(paymentIntent.metadata.userId);
      
      if (!user) {
        throw new Error(`User not found for ID: ${paymentIntent.metadata.userId}`);
      }

      if (user.isLoyaltyMember) {
        const pointsRedeemed = parseInt(paymentIntent.metadata.pointsRedeemed || 0);
        if (pointsRedeemed > 0) {
          user.points -= pointsRedeemed;  
        }
      }

      const pointsEarned = Math.floor((paymentIntent.amount / 100) * 10);  
      if (user.referredBy) {
        const referrer = await User.findById(user.referredBy);

        if (referrer && referrer.isLoyaltyMember) {
          referrer.points += pointsEarned;
          await referrer.save();
        }
      }

      await user.save({ validateBeforeSave: false });
      
      if (!paymentIntent.metadata.cartItems) {
        throw new Error('Cart items not found in metadata');
      }

      const cartItems = JSON.parse(paymentIntent.metadata.cartItems);
  
      const orderItems = await Promise.all(cartItems.map(async (item) => {
        const product = await Product.findById(item.id);
        if (!product) {
          throw new Error(`Product not found for ID: ${item.id}`);
        }
        return {
          product: item.id,
          name: product.name,
          price: product.price,
          image: product.images[0].url,
          quantity: item.quantity,
          sku: product.sku || 'N/A'
        };
      }));

      // Fetch the user's default delivery address
      const deliveryAddress = await DeliveryAddress.findOne({ user: user._id, isDefaultAddress: true });
      
      if (!deliveryAddress) {
        throw new Error('No default delivery address found for the user');
      }

      const order = new Order({
        user: user._id,
        orderItems: orderItems,
        shippingInfo: {
          firstName: deliveryAddress.firstName,
          lastName: deliveryAddress.lastName,
          address: deliveryAddress.street,
          apartment: deliveryAddress.aptBuildingSuite,
          city: deliveryAddress.city,
          province: deliveryAddress.province,
          country: deliveryAddress.country,
          postalCode: deliveryAddress.postcode,
          phoneNo: deliveryAddress.phoneNumber
        },
        itemsPrice: paymentIntent.amount / 100,
        taxPrice: 0, 
        shippingPrice: 0,
        totalPrice: paymentIntent.amount / 100,
        paidAt: new Date(),
        paymentInfo: {
          id: paymentIntent.id,
          status: paymentIntent.status,
        },
        type: 'home delivery', 
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
      user.orders.push(order._id);
      await user.save({ validateBeforeSave: false });

      console.log('Order created successfully');
    } catch (error) {
      console.error('Error processing webhook:', error);
    }
  }
  res.json({ received: true });
};