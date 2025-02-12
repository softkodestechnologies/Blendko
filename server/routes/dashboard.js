const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { getDashboardData, getReports } = require('../controllers/dashboard.controller');

router.get('/data', isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), getDashboardData);
router.get('/reports', isAuthenticatedUser, authorizeRoles('admin', 'super-admin'), getReports);

module.exports = router;