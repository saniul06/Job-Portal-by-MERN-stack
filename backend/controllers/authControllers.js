const { nanoid } = require('nanoid')
const Category = require('../models/Category');
const User = require('../models/User')
const Variable = require('../models/Variable')
const Employee = require('../models/Employee')
const Employer = require('../models/Employer')
const { validationResult } = require('express-validator')
const formatter = require('../utils/validationErrorFormatter')
const sendJwtToken = require('../utils/sendJwtToken')
const { sendVerificationEmail } = require('../utils/email')
const { uploadImage, uploadVideo, deleteMedia } = require('../utils/media')

exports.registerEmployeeController = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            category,
            subcategory,
            country,
            role,
            phone,
            state,
            experience,
            availability
        } = req.body;

        const video = req.files ? req.files.video : null
        const avatar = req.files ? req.files.avatar : null
        const myImage = {}
        const myVideo = {}

        let validationErrors = {};
        const errors = validationResult(req).formatWith(formatter)

        if (!errors.isEmpty()) {
            validationErrors = errors.mapped()
        }

        if (!video) {
            validationErrors.video = "Please upload a introductory video about yourself"
        }

        if (video && video.mimetype.split('/')[0] !== 'video') {
            validationErrors.video = "Please upload an video file"
        }

        const maxSize = await Variable.findOne()
        const maxVideoSize = maxSize.MaxVideoSize

        if (video && video.size > maxVideoSize * 1024 * 1024) {
            validationErrors.video = `Video size must not exceed ${maxVideoSize} MB`
        }

        if (avatar && avatar.mimetype.split('/')[0] !== 'image') {
            validationErrors.avatar = "Please upload an image file"
        }

        if (Object.values(validationErrors).length > 0) {
            return res.status(400).json({
                errorMessage: validationErrors
            })
        }

        if (avatar) {
            // upload image to google drive
            await uploadImage(avatar, myImage, res)

        } else {
            myImage.webContentLink = null
            myImage.webViewLink = null
            myImage.avatarId = null
        }

        // upload video to google drive
        await uploadVideo(video, myVideo, res)

        const verificationCode = nanoid(6)

        const user = await User.create({
            name,
            email,
            password,
            role,
            avatar: myImage,
            verificationCode
        })

        await Employee.create({
            userId: user._id,
            category,
            subcategory,
            country,
            phone,
            state,
            experience,
            availability,
            video: myVideo,
            favorites: [],
            numOfViews: []

        })

        //send confirmation email
        sendVerificationEmail(verificationCode, user, res)

        res.status(200).json({
            success: true,
            message: 'Check your email to update password',
            userId: user._id
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
};

exports.registerEmployerController = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            country,
            phone,
        } = req.body;

        let validationErrors = {};
        const errors = validationResult(req).formatWith(formatter)

        if (!errors.isEmpty()) {
            validationErrors = errors.mapped()
        }

        if (Object.values(validationErrors).length > 0) {
            return res.status(400).json({
                errorMessage: validationErrors
            })
        }

        const verificationCode = nanoid(6)

        const user = await User.create({
            name,
            email,
            password,
            role: 'employer',
            verificationCode
        })

        await Employer.create({
            userId: user._id,
            country,
            phone
        })

        //send confirmation email
        sendVerificationEmail(verificationCode, user, res)

        res.status(200).json({
            success: true,
            message: 'Check your email to update password',
            userId: user._id
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
};

exports.getCategoriesAndSubCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            categories
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            errorMessage: 'Intrnal server error'
        });
    }
};

exports.verifyEmailController = async (req, res, next) => {
    try {
        const { verificationCode, userId } = req.body
        if (!verificationCode) {
            return res.status(400).json({
                success: false,
                errorMessage: "Please enter verification code"
            })
        }

        const user = await User.findById(userId)
        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({
                success: false,
                errorMessage: "Wrong verification code"
            })
        }

        if (user.expiresIn < Date.now()) {
            return res.status(400).json({
                success: false,
                errorMessage: "Verification code expired. Click 'RESEND EMAIL' button"
            })
        }

        user.isVerified = 1
        user.verificationCode = null
        await user.save()

        res.status(200).json({
            success: true,
            message: "Verification successful. Please log in"
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}

exports.getSingleUser = async (req, res, next) => {
    try {
        console.log('hello')
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                errorMessage: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error by mongoose"
        })
    }
}

exports.resendVerificationEmail = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id)

        if (!user) {
            return res.status(404).json({
                errorMessage: "User not found"
            })
        }

        const verificationCode = nanoid(6)
        sendVerificationEmail(verificationCode, user, res)

        user.verificationCode = verificationCode
        user.expiresIn = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours() + 1)

        await user.save()

        res.status(200).json({
            success: true,
            message: "Resend email successful. Please check your email"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                errorMessage: "Please enter email & password"
            })
        }

        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            console.log('fourth')
            return res.status(401).json({
                errorMessage: "Invalid email or password"
            })
        }

        const isPasswordMatched = await user.comparePassword(password)

        if (!isPasswordMatched) {
            return res.status(401).json({
                errorMessage: "Invalid email or password"
            })
        }

        if (!user.isVerified) {
            return res.status(401).json({
                user,
                errorMessage: "Verify your email"
            })
        }

        const employee = await Employee.findOne({ userId: user._id })

        sendJwtToken(user, 200, res, employee)


    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}

exports.loadUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(401).json({
                errorMessage: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        res.status(401).json({
            success: false
        })
    }
}

exports.loadEmployee = async (req, res, next) => {
    try {
        let employee = await Employee.findOne({ userId: req.params.id })
        if (!employee) {
            return res.status(401).json({
                errorMessage: "Employee not found"
            })
        }

        res.status(200).json({
            success: true,
            employee
        })

    } catch (err) {
        // console.log(err)
        res.status(401).json({
            success: false
        })
    }
}

exports.logout = async (req, res, next) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: 'Logout successfully'
        })
    } catch (err) {
        res.status(500).json({
            errorMessage: "Logout failed"
        })
    }
}

exports.getUserByEmail = async (req, res, next) => {
    try {

        if (!req.body.email) {
            return res.status(400).json({
                errorMessage: "Please enter your email"
            })
        }

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({
                errorMessage: "Invalid email address"
            })
        }

        const verificationCode = nanoid(6)
        sendVerificationEmail(verificationCode, user, res)

        user.verificationCode = verificationCode
        user.expiresIn = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours() + 1)
        user.isVerified = 0

        await user.save()


        res.status(200).json({
            success: true,
            message: 'User is found',
            user
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}

exports.resetPassword = async (req, res, next) => {
    try {

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(401).json({
                errorMessage: 'Password doesn\'t match'
            })
        }

        if (req.body.password.length < 6) {
            return res.status(401).json({
                errorMessage: 'Password must be longer than 5 characters'
            })
        }

        const user = await User.findById(req.body.userId)

        if (!user) {
            return res.status(401).json({
                errorMessage: "User not found"
            })
        }

        user.password = req.body.password

        await user.save()

        // sendToken(user, 200, res)
        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        const {
            name,
            email
        } = req.body;

        const avatar = req.files ? req.files.avatar : null
        const myImage = {}

        let validationErrors = {};
        const errors = validationResult(req).formatWith(formatter)

        if (!errors.isEmpty()) {
            validationErrors = errors.mapped()
        }

        if (name.length > 30 || name.length < 3) {
            validationErrors.name = "Name must be between 3 to 30 characters"
        }

        if (avatar && avatar.mimetype.split('/')[0] !== 'image') {
            validationErrors.avatar = "Please upload an image file"
        }

        if (Object.values(validationErrors).length > 0) {
            return res.status(400).json({
                errorMessage: validationErrors
            })
        }

        const user = await User.findById(req.user._id)
        const findEmail = await User.findOne({ email })

        if (findEmail && email !== user.email) {
            return res.status(401).json({
                errorMessage: { email: "Email already in use" }
            })
        }

        if (avatar) {
            // upload image to google drive
            await uploadImage(avatar, myImage, res)
            if (user.avatar.avatarId) {
                console.log('before deleted')
                await deleteMedia(user.avatar.avatarId, res)
                console.log('after deleted')
                console.log('new image saved in database')

            }
            user.avatar = myImage
        }

        if (user.email !== email) {
            user.email = email
        }

        user.name = name


        await user.save()

        res.status(200).json({
            success: true,
            message: 'Update successful',
            user
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}

exports.updateCv = async (req, res, next) => {
    try {
        const {
            category,
            subcategory,
            country,
            phone,
            state,
            experience,
            availability
        } = req.body;

        const video = req.files ? req.files.video : null
        const myVideo = {}

        let validationErrors = {};
        const errors = validationResult(req).formatWith(formatter)

        if (!errors.isEmpty()) {
            validationErrors = errors.mapped()
        }

        if (video && video.mimetype.split('/')[0] !== 'video') {
            validationErrors.video = "Please upload an video file"
        }

        if (video && video.size > 80 * 1024 * 1024) {
            validationErrors.video = "Video size must not exceed 80 MB"
        }

        if (Object.values(validationErrors).length > 0) {
            return res.status(400).json({
                errorMessage: validationErrors
            })
        }

        const employee = await Employee.findById(req.body._id)

        if (!employee) {
            return res.status(401).json({
                errorMessage: "Employee not found"
            })
        }

        employee.category = category
        employee.subcategory = subcategory
        employee.country = country
        employee.phone = phone
        employee.state = state
        employee.experience = experience
        employee.availability = availability
        employee.isUpdated = 1
        employee.deactivateDate = new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())

        // upload video to google drive
        if (video) {
            if (employee.video.videoId) {
                await deleteMedia(employee.video.videoId, res)
            }

            await uploadVideo(video, myVideo, res)
            employee.video = myVideo

            if (req.user.role === 'employee') {
                employee.isApproved = 0
            }
        }

        employee.save({ validateBeforeSave: false })

        res.status(200).json({
            success: true,
            message: 'Cv updated successfully',
            employee
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}

exports.updatePassword = async (req, res, next) => {
    try {
        const errors = {}
        const { oldPassword, newPassword, confirmNewPassword } = req.body
        const user = await User.findById(req.user._id).select("+password")

        if (!user) {
            return res.status(401).json({
                errorMessage: "Cann't update password"
            })
        }

        console.log('oldpassword is: ', oldPassword)

        const isPasswordMatched = await user.comparePassword(oldPassword)


        if (!oldPassword) errors.oldPassword = "Fields cann't be empty"

        if (!isPasswordMatched) errors.oldPassword = "Old password doesn't match"

        if (!newPassword) errors.newPassword = "Fields cann't be empty"

        if (!confirmNewPassword) errors.confirmNewPassword = "Fields cann't be empty"

        if (newPassword !== confirmNewPassword) {
            errors.newPassword = "Password doesn't match"
            errors.confirmNewPassword = "Password doesn't match"
        }

        if (newPassword.length < 6) errors.newPassword = "Password must be greater than 5 characters"

        if (newPassword.length < 6) errors.confirmNewPassword = "Password must be greater than 5 characters"

        if (Object.values(errors).length > 0) {
            return res.status(400).json({
                errorMessage: errors
            })
        }

        user.password = newPassword

        await user.save()

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}