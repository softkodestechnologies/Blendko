const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: {
      values: ['home delivery', 'pickup'],
      message: 'Please select correct type',
    },
  },
  pickupInfo: {},
  shippingInfo: {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your last name'],
    },
    country: {
      type: String,
      required: [true, 'Please enter your country'],
    },
    address: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: [true, 'Please enter your city'],
    },
    phoneNo: {
      type: String,
      required: [true, 'Please enter your phone number'],
    },
    postalCode: {
      type: String,
      required: [true, 'Please enter your postal code'],
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        public_id: String,
        url: String,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  profit: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'Processing',
    enum: {
      values: ['Processing', 'Delivered'],
      message: 'Please select correct order status',
    },
  },
  deliveredAt: Date,
  paidAt: Date,
}, {
  timestamps: true,
});

const Order = model('Order', orderSchema);
module.exports = Order;