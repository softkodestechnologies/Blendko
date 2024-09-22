const express = require('express');
const router = express.Router();

const {
  getJobs,
  newJob,
  getSingleJob,
  updateJob,
  deleteJob,
  applyForJob,
  setJobAlert,
  updateApplicationStatus,
  deleteApplication,
  getAllJobApplications,
  getSingleJobApplication
} = require('../controllers/job.controller');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/alert').post(setJobAlert);
router.route('/').get(getJobs);


router.route('/admin/new').post(isAuthenticatedUser, authorizeRoles('admin'), newJob);
router.route('/admin/applications').get(isAuthenticatedUser, authorizeRoles('admin'), getAllJobApplications);
router.route('/admin/application/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleJobApplication) 
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateApplicationStatus)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteApplication);
router.route('/admin/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateJob)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteJob);


router.route('/:id/apply').post(applyForJob);
router.route('/:id').get(getSingleJob);

module.exports = router;