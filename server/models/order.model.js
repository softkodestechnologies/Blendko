const { Schema, model } = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(require('mongoose'));

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
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      sku: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        default: 0,  
      },
      total: {
        type: Number,
        required: true,
        default: function() {
          return this.price * this.quantity * (1 - this.discount / 100);
        },
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
  cost: {
    type: Number,
    default: 0,  
  },
  discountAmount: {
    type: Number,
    default: 0, 
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'Pending',
    enum: {
      values: ['Pending', 'Confirmed', 'Processing', 'Picked', 'Shipped', 'Delivered', 'Cancelled'],
      message: 'Please select correct order status',
    },
  },
  deliveredAt: Date,
  paidAt: Date,
  orderNumber: {
    type: Number,
  },
  }, {
    timestamps: true,
  });

orderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber', start_seq: 1001 });
const Order = model('Order', orderSchema);
module.exports = Order;