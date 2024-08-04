const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter news title'],
    trim: true,
    maxLength: [100, 'News title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please enter news content']
  },
  image: {
    public_id: String,
    url: String
  },
  author: {
    type: String,
    required: [true, 'Please enter author name']
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('News', newsSchema);