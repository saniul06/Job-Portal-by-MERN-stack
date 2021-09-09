const User = require('../models/User')
const Employee = require('../models/Employee')
const Category = require('../models/Category');
const { uploadImage, uploadVideo, deleteMedia } = require('../utils/media')
const { validationResult } = require('express-validator')
const formatter = require('../utils/validationErrorFormatter')

exports.updateProfile = async (req, res, next) => {
    try {


    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}