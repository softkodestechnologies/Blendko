const mongoose = require('mongoose');

let nanoid;

(async () => {
  const { customAlphabet } = await import('nanoid');
  nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
})();

const jobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    default: () => nanoid(),
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Please enter job title'],
    trim: true,
    maxLength: [100, 'Job title cannot exceed 100 characters']
  },
  positionType: {
    type: String,
    required: [true, 'Please specify position type'],
    enum: {
      values: ['Full Time', 'Part Time'],
      message: 'Please select correct position type'
    }
  },
  brand: {
    type: String,
    required: [true, 'Please enter brand name'],
    trim: true
  },
  careerArea: {
    type: String,
    required: [true, 'Please specify career area'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please enter job location'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please enter job description']
  },
  requirements: [String],
  responsibilities: [String],
  postedDate: {
    type: Date,
    default: Date.now
  },
  closingDate: {
    type: Date,
    required: [true, 'Please specify closing date for applications']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);


module.exports = Job;