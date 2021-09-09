const router = require('express').Router();
const User = require('../models/User')
const { body } = require('express-validator');
const { } = require('../controllers/employeeController');
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

module.exports = router
