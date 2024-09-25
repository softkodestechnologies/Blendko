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
  jobType: {
    type: String,
    enum:  ['Full-time', 'Part-time', 'Internship'],
    default: 'Full-time'
  },
  brand: {
    type: String,
    trim: true
  },
  careerArea: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['Design', 'Marketing', 'Retail'],
    default: 'Retail'
  },
  location: {
    type: String,
    enum: ['Onsite', 'Remote', 'Hybrid'],
    default: 'Onsite'
  },
  description: {
    type: String,
    required: [true, 'Please enter job description']
  },
  requirements: {
    type: String,
    trim: true
  },
  salary: {
    type: Number,
  },
  responsibilities: [String],
  postedDate: {
    type: Date,
    default: Date.now
  },
  closingDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
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