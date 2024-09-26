const Job = require('../models/job.model');
const JobApplication = require('../models/jobApplication.model');
const JobAlert = require('../models/jobAlert.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');
const sendEmail = require('../utils/sendEmail');


exports.newJob = catchAsyncErrors(async (req, res, next) => {
    const job = await Job.create(req.body);
  
    const jobAlerts = await JobAlert.find({});
    for (const alert of jobAlerts) {
      const message = `Dear,\n\nA new job position has been posted: ${job.title} at ${job.brand}.\n\nBest regards,\nHR Team`;
      await sendEmail({
        email: alert.email,
        subject: 'New Job Posting',
        message
      });
    }
  
    res.status(201).json({
      success: true,
      job
    });
});
  


exports.getJobs = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = req.query.pp || 10;
  let sort = { postedDate: -1 }; 

  if (req.query.sort && req.query.sort === '-1') {
    sort = { closingDate: -1 };
  }

  const apiFeatures = new ApiFeatures(
    Job.find().sort(sort),
    req.query,
    Job
  )
    .search()
    .filter()
    .pagination(resPerPage);

  const jobs = await apiFeatures.query;
  const jobsCount = await apiFeatures.document;

  res.status(200).json({
    success: true,
    count: jobs.length,
    jobsCount,
    jobs
  });
});


exports.getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorHandler('Job not found', 404));
  }

  res.status(200).json({
    success: true,
    job
  });
});


exports.updateJob = catchAsyncErrors(async (req, res, next) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorHandler('Job not found', 404));
  }

  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    job
  });
});


exports.deleteJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorHandler('Job not found', 404));
  }

  await Job.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: 'Job is deleted.'
  });
});





exports.applyForJob = catchAsyncErrors(async (req, res, next) => {
    const job = await Job.findById(req.params.id);
  
    if (!job) {
      return next(new ErrorHandler('Job not found', 404));
    }
  

    const application = await JobApplication.create({
      job: job._id,
      applicantName: req.body.name,
      applicantEmail: req.body.email,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter
    });

    const message = `Dear ${req.body.name},\n\nThank you for applying to the ${job.title} position at ${job.brand}. We have received your application and will review it shortly.\n\nBest regards,\nHR Team`;

    await sendEmail({
        email: req.body.email,
        subject: `Application Received for ${job.title}`,
        message
    });
  
    res.status(200).json({
        success: true,
        message: 'Application submitted successfully',
        application
    });
});


exports.setJobAlert = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
  
    const existingAlert = await JobAlert.findOne({ email });
    if (existingAlert) {
      return next(new ErrorHandler('You have already set a job alert for this email', 400));
    }
  
    const jobAlert = await JobAlert.create({ email });
  
    const message = `Dear,\n\nThank you for setting a job alert. You will receive notifications about new job postings at our Blendko website.\n\nBest regards,\nHR Team`;
  
    await sendEmail({
      email: jobAlert.email,
      subject: 'Job Alert Set Successfully',
      message
    });
  
    res.status(200).json({
      success: true,
      message: 'Job alert set successfully'
    });
});


exports.getAllJobApplications = catchAsyncErrors(async (req, res, next) => {
    const Applications = await JobApplication.find()
      .populate('job', 'title');
  
    res.status(200).json({
      success: true,
      Applications
    });
});

exports.getJobApplicationsByJobId = catchAsyncErrors(async (req, res, next) => {
    const jobId = req.params.jobId;

    const applications = await JobApplication.find({ job: jobId })

    if (!applications) {
        return next(new ErrorHandler('No applications found for this job', 404));
    }

    if(applications.length === 0) {
        return res.status(404). json({
            success: true,
            applications
        })
    }

    res.status(200).json({
        success: true,
        applications
    });
});


exports.getSingleJobApplication = catchAsyncErrors(async (req, res, next) => {

  const application = await JobApplication.findById(req.params.id)
    .populate('job', 'title');

  if (!application) {
    return next(new ErrorHandler('Job application not found', 404));
  }

  res.status(200).json({
    success: true,
    application
  });
});


exports.updateApplicationStatus = catchAsyncErrors(async (req, res, next) => {
    const Application = await JobApplication.findById(req.params.id);

    if (!Application) {
        return next(new ErrorHandler('Application not found', 404));
    }

    Application.status = req.body.status;
    await Application.save();

    res.status(200).json({
        success: true,
        Application
    });
});
  

exports.deleteApplication = catchAsyncErrors(async (req, res, next) => {
    const Application = await JobApplication.findById(req.params.id);

    if (!Application) {
        return next(new ErrorHandler('Application not found', 404));
    }

    await Application.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: 'Application deleted successfully'
    });
});