const mongoose = require('mongoose');

const deliveryAddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true 
  },
  street: {
    type: String,
    required: [true, 'Please enter the street address']
  },
  aptBuildingSuite: {
    type: String
  },
  postcode: {
    type: String,
    required: [true, 'Please enter the postcode']
  },
  city: {
    type: String,
    required: [true, 'Please enter the city']
  },
  province: {
    type: String,
    required: [true, 'Please enter the province']
  },
  country: {
    type: String,
    required: [true, 'Please enter the country']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please enter the phone number']
  }
}, {
  timestamps: true
});

const DeliveryAddress = mongoose.model('DeliveryAddress', deliveryAddressSchema);

module.exports = DeliveryAddress;
