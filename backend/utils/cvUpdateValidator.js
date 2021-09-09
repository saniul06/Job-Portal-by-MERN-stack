const { body } = require('express-validator');
const User = require('../models/User');

module.exports = [
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
