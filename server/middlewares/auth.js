const catchAsyncErrors = require('./catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
 
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(new ErrorHandler('Login first to access this resource.', 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRoles = Array.isArray(req.user.role) ? req.user.role : [req.user.role];

    if (!req.user || !userRoles.some(role => roles.includes(role)))
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource.`,
          403
        )
      );

    next();
  };
};