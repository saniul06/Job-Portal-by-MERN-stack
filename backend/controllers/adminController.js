const { validationResult } = require('express-validator')
const formatter = require('../utils/validationErrorFormatter')
const User = require('../models/User')
const Category = require('../models/Category')
const Employee = require('../models/Employee')
const Employer = require('../models/Employer')
const Variable = require('../models/Variable')
const { sendEmailToEmployee } = require('../utils/email')
const { deleteMedia } = require('../utils/media')
const ApiFeatures = require('../utils/ApiFeatures')

exports.createCategoryController = (req, res, next) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({
                errorMessage: "Please enter a category name"
            })
        }

        const obj = {
            name: req.body.name
        }

        if (req.body.parentId) {
            obj.parentId = req.body.parentId
        } else {
            obj.parentId = null
        }

        const cat = new Category(obj)
        cat.save((err, category) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(400).json({
                        errorMessage: `Duplicate Category ${Object.keys(err.keyValue)} is not allowed`
                    })
                }
                return res.status(400).json({
                    errorMessage: `Internal server error`
                })
            }
            if (category) {
                return res.status(201).json({
                    success: true,
                    message: 'Category created successfully'
                })
            }
        })


    } catch (err) {
        console.log(err)
    }
}

exports.getAllCategoriesController = async (req, res, next) => {
    try {
        const categories = await Category.find({ parentId: null })
        res.status(200).json({
            success: true,
            categories
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            errorMessage: 'Internal server error'
        })
    }

}

exports.updateCategoryController = async (req, res, next) => {
    // TODO:  after employee cv createin
    try {
        if (!req.body.name) {
            return res.status(400).json({
                success: false,
                errorMessage: "Please select a category"
            })
        }

        const category = await Category.find({ name: req.body.name })
        if (category) {
            return res.status(400).json({
                success: false,
                errorMessage: "Categor already exists"
            })
        }


    } catch (err) {
        console.log(err)
    }
}

exports.deleteCategoryController = async (req, res, next) => {
    try {
        if (!req.body.category) {
            return res.status(400).json({
                success: false,
                errorMessage: "Please enter a category"
            })
        }
        let category = await Employee.findOne({ category: req.body.category })
        if (category) {
            return res.status(400).json({
                success: false,
                errorMessage: "Category already in use"
            })
        }

        category = await Category.findOne({ name: req.body.category })
        category.remove()
        res.status(200).json({
            success: true,
            message: "Category removed successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}

exports.deleteSubCategoryController = async (req, res, next) => {
    try {
        if (!req.body.subcategory) {
            return res.status(400).json({
                success: false,
                errorMessage: "Please enter a subcategory"
            })
        }
        let subcategory = await Employee.findOne({ subcategory: req.body.subcategory })

        if (subcategory) {
            return res.status(400).json({
                success: false,
                errorMessage: "Sub category already in use"
            })
        }

        subcategory = await Category.findOne({ name: req.body.subcategory })
        subcategory.remove()
        res.status(200).json({
            success: true,
            message: "Sub category removed successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}

exports.getSubcategoriesController = async (req, res, next) => {
    try {
        const categories = await Category.find()
        const subcategories = categories.filter(cat => cat.parentId)
        res.status(200).json({
            success: true,
            subcategories
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}

exports.getMaxVideoSizeController = async (req, res, next) => {
    try {
        const video = await Variable.findOne()
        res.status(200).json({
            success: true,
            video
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}

exports.setMaxVideoSizeController = async (req, res, next) => {
    try {
        const MaxVideoSize = req.body.MaxVideoSize
        if (!req.body.MaxVideoSize) {
            return res.status(400).json({
                success: false,
                errorMessage: "Please set an video size"
            })
        }

        await Variable.findByIdAndUpdate(req.body.videoId, { MaxVideoSize: req.body.MaxVideoSize }, {
            new: true,
            useFindAndModify: false
        })

        res.status(201).json({
            success: true,
            message: 'Video size set successfully'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: fasle,
            errorMessage: "Internal server error"
        })
    }
}


exports.getVerifiedUser = async (req, res, next) => {
    try {

        const allUser = await User.find()
        if (!allUser) {
            return res.status(400).json({
                success: true,
                message: "No user found"
            })
        }

        const totalUser = await User.countDocuments()
        const itemsPerPage = 3
        const apiFeatures = new ApiFeatures(User, req.query).filter()

        const filteredEmployeesNumber = await apiFeatures.collection

        apiFeatures.pagination(itemsPerPage)

        const users = await apiFeatures.collection

        res.status(200).json({
            success: true,
            itemsPerPage,
            totalUser,
            users,
            count: filteredEmployeesNumber.length,
        })

    } catch (err) {
        conssole.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}

exports.getUnverifiedUsers = async (req, res, next) => {
    try {

        const allUser = await User.find()
        if (!allUser) {
            return res.status(400).json({
                success: true,
                message: "No user found"
            })
        }

        const totalUser = await User.countDocuments()
        const itemsPerPage = 4
        const apiFeatures = new ApiFeatures(User, req.query).filter()

        const filteredEmployeesNumber = await apiFeatures.collection

        apiFeatures.pagination(itemsPerPage)

        const users = await apiFeatures.collection

        res.status(200).json({
            success: true,
            itemsPerPage,
            totalUser,
            users,
            count: filteredEmployeesNumber.length,
        })

    } catch (err) {
        conssole.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}


exports.sendEmailToEmployeeController = async (req, res, next) => {
    try {
        const { name, email, subject, body } = req.body
        if (!name || !email || !subject || !body) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Please all required fields'
            })
        }

        sendEmailToEmployee({ name, email, subject, body }, res)

        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}

exports.addInstagramVideoLinkController = async (req, res, next) => {
    const { link } = req.body
    console.log('The link is: ', link, typeof (link))
    console.log(req.body.link, Boolean(req.body.link), req.body._id)
    console.log(typeof (req.body.link))
    console.log(typeof (req.body.data))
    // return
    try {
        if (req.body.link === 'undefined') {
            console.log('i am here')
            return res.status(400).json({
                success: false,
                errorMessage: 'Please specify a link'
            })
        }

        const cv = await Employee.findById(req.body._id)
        if (!cv) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Cv does not exist'
            })
        }

        cv.video.instagramLink = req.body.link
        cv.save({ validateBeforeSave: false })
        res.status(200).json({
            success: true,
            message: "Link added successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}

exports.deleteVideoController = async (req, res, next) => {
    try {
        if (!req.body._id) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Please specify a video id'
            })
        }

        const cv = await Employee.findById(req.body._id)

        if (!cv) {
            return res.status(400).json({
                success: false,
                errorMessage: "Cv not found"
            })
        }

        if (cv.video.webContentLink) {
            await deleteMedia(cv.video.videoId, res)
            cv.video.webContentLink = null
            cv.video.webViewLink = null
            cv.video.videoId = null
            cv.save({ validateBeforeSave: false })
            res.status(200).json({
                success: true,
                message: "Video deleted successfully"
            })

        } else {
            return res.status(200).json({
                success: true,
                message: "Video already deleted"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}

exports.approveOrDisapproveController = async (req, res, next) => {
    try {
        if (!req.body._id) {
            return res.status(400).json({
                success: false,
                errorMessage: "Cannot approve or disapprove"
            })
        }
        const cv = await Employee.findById(req.body._id)
        if (!cv) {
            return res.status(400).json({
                success: false,
                errorMessage: "Cv not found"
            })
        }
        if (cv.isApproved) {
            cv.isApproved = 0
        } else {
            cv.isApproved = 1
        }
        cv.save({ validateBeforeSave: false })

        res.status(200).json({
            success: true,
            message: "Cv updated successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}

exports.activateOrDeactivateController = async (req, res, next) => {
    try {
        if (!req.body._id) {
            return res.status(400).json({
                success: false,
                errorMessage: "Cannot activate or deactivate"
            })
        }
        const cv = await Employee.findById(req.body._id)
        if (!cv) {
            return res.status(400).json({
                success: false,
                errorMessage: "Cv not found"
            })
        }
        if (cv.isActivated) {
            cv.isActivated = 0
            cv.deactivateDate = new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())
        } else {
            cv.isActivated = 1
            deactivateDate = new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())
        }
        cv.save({ validateBeforeSave: false })

        res.status(200).json({
            success: true,
            message: "Cv updated successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}

// exports.deleteUserAndCv = async (req, res) => {
//     try {
//         if (!req.body.userId) {
//             return res.status(400).json({
//                 success: false,
//                 errorMessage: "Please select a cv"
//             })
//         }

//         const cv = await Employee.findById(req.body._id)
//         if (!cv) {
//             return res.status(400).json({
//                 success: false,
//                 errorMessage: "Cv not found"
//             })
//         }

//         const user = await User.findById(cv.userId)
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 errorMessage: "Employee not found"
//             })
//         }

//         if (cv.video.videoId) {
//             await deleteMedia(cv.video.videoId, res)
//         }

//         if (user.avatar.avatarId) {
//             await deleteMedia(user.avatar.avatarId)
//         }

//         cv.remove()
//         user.remove()

//         res.status(200).json({
//             success: true,
//             message: "Deletion Successfull"
//         })

//     } catch (err) {
//         console.log(err)
//         res.status(500).json({
//             success: false,
//             errorMessage: "Internal server error"
//         })
//     }
// }

exports.deleteUserAndCv = async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(400).json({
                success: false,
                errorMessage: "Please select a cv"
            })
        }

        const user = await User.findById(req.body.userId)
        if (!user) {
            return res.status(400).json({
                success: false,
                errorMessage: "User not found"
            })
        }

        if (user.role === 'employee') {
            // if this is an job seeker account then delete image from server if exists
            if (user.avatar.avatarId) {
                await deleteMedia(user.avatar.avatarId)
            }

            // if this is an job seeker account then delete video from server if exists
            const cv = await Employee.findOne({ userId: req.body.userId })
            if (cv) {
                if (cv.video.videoId) {
                    await deleteMedia(cv.video.videoId, res)
                }
                cv.remove()
            }
        }

        if (user.role === 'employer') {
            // if this is employer account then remove the favorites from employee document 
            const favoriteCvs = await Employee.find({ 'favorites.employerId': req.body.userId })
            for (let i = 0; i < favoriteCvs.length; i++) {
                favoriteCvs[i].favorites = favoriteCvs[i].favorites.filter(favorite => favorite.employerId.toString() !== req.body.userId.toString())
                favoriteCvs[i].save()
            }

            // if this is an employer account then remove it from employer collection
            const employer = await Employer.findOne({ userId: req.body.userId })
            if (employer) {
                employer.remove()
            }
        }

        user.remove()

        res.status(200).json({
            success: true,
            message: "Deletion Successfull"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}

exports.registerAdminController = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            confirmPassword
        } = req.body;

        let validationErrors = {};
        const errors = validationResult(req).formatWith(formatter)

        if (!errors.isEmpty()) {
            validationErrors = errors.mapped()
        }

        if (name.length > 30 || name.length < 3) {
            validationErrors.name = "Name must be between 3 to 30 characters"
        }

        if (!password) {
            validationErrors.password = "Please enter a password"
        }

        if (!confirmPassword) {
            validationErrors.confirmPassword = "Please enter a password"
        }

        if (password.length < 6) {
            validationErrors.password = "Password must be longer than 5 characters"
        }

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = "Password does not match"
        }

        if (Object.values(validationErrors).length > 0) {
            return res.status(400).json({
                errorMessage: validationErrors
            })
        }

        const findEmail = await User.findOne({ email })

        if (findEmail) {
            return res.status(401).json({
                errorMessage: { email: "Email already in use" }
            })
        }

        const user = await User.create({
            name,
            email,
            password,
            role: 'admin',
            isVerified: 1
        })

        res.status(201).json({
            success: true,
            message: "Admin created successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            errorMessage: "Internal server error"
        })
    }
}

