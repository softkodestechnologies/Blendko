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
  category: {
    type: String,
    required: [true, 'Please select a category']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  publishDate: {
    type: Date,
    required: [true, 'Please enter a publish date']
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('News', newsSchema);