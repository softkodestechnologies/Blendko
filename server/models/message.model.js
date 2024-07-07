const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
  },
  images: [{
    public_id: String,
    url: String,
  }],
}, {
  timestamps: true,
});

const Message = model('Message', messageSchema);
module.exports = Message;