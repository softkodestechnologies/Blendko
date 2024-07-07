const { Schema, model } = require('mongoose');

const discountSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed_amount', 'free_shipping'],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  startsOn: {
    type: Date,
    required: true,
  },
  expiresOn: {
    type: Date,
    required: true,
  },
  usageLimit: {
    type: Number,
    default: 0,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'disabled'],
    default: 'active',
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
}, {
  timestamps: true,
});

const Discount = model('Discount', discountSchema);
module.exports = Discount;