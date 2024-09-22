const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicantName: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true
  },
  applicantEmail: {
    type: String,
    required: [true, 'Please enter your email'],
    trim: true
  },
  resume: {
    type: String,
    required: [true, 'Please upload your resume']
  },
  coverLetter: {
    type: String,
    required: [true, 'Please include a cover letter']
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);