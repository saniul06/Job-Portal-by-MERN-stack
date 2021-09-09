const { body } = require('express-validator');
const User = require('../models/User');

module.exports = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Please provide a name')
        .isLength({ min: 3, max: 30 })
        .withMessage('Name must be between 3 to 30 characters')
        .trim(),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Please provide an email')
        .isEmail()
        .withMessage('Invaid email address')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                return Promise.reject('Email already in use');
            }
            return true;
        }),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Please provide a password')
        .isLength({ min: 6 })
        .withMessage('Password must be greater than 5 characters'),
    body('confirmPassword')
        .not()
        .isEmpty()
        .withMessage("Password doesn't match")
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error('Password doesn"t match');
            }
            return true;
        }),
    body('country')
        .not()
        .isEmpty()
        .withMessage("Please select a country"),
    body('category')
        .not()
        .isEmpty()
        .withMessage("Please select a category"),
    body('subcategory')
        .not()
        .isEmpty()
        .withMessage("Please select a subcategory")
];
