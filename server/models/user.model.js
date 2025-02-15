const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomBytes, createHash } = require('node:crypto');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Your password must be longer than 6 characters'],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: [String],
    default: ['user'],
    enum: {
      values: ['user', 'admin', 'super-admin'],
      message: 'Please select correct role',
    },
  },
  gender: String,
  phone: String,
  dateOfBirth: Date,
  country: String,
  province: String,
  city: String,
  postcode: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      color: String,
      size: String,
    },
  ],
  wishlist: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  points: {
    type: Number,
    default: 0,
  },
  referralCode: {
    type: String,
    unique: true,
  },
  referredBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  referrals: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  isLoyaltyMember: {
    type: Boolean,
    default: false,
  },
  dOB: {
    day: String,
    month: String,
    year: String,
  },
  lastLoginAt: {
    type: Date,
    default: null,
  },
  activityLog: [
    {
      action: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  notificationPreferences: [String],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Generate reset password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = randomBytes(20).toString('hex');
  this.resetPasswordToken = createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire =
    Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRES_TIME, 10);
  return resetToken;
};

// Create the user model
const User = model('User', userSchema);

module.exports = User;