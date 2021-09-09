const Employee = require('../models/Employee')
const ApiFeatures = require('../utils/ApiFeatures')

exports.getAllCvsController = async (req, res, next) => {
    try {
        const allCv = await Employee.find()
        if (!allCv) {
            return res.status(400).json({
                success: true,
                message: "No cv found"
            })
        }

        const totalCv = await Employee.countDocuments()
        const itemsPerPage = 3
        const apiFeatures = new ApiFeatures(Employee, req.query).filter()

        const filteredEmployeesNumber = await apiFeatures.collection

        apiFeatures.pagination(itemsPerPage)

        const cvs = await apiFeatures.collection.populate('userId', 'name email isVerified avatar')


        res.status(200).json({
            success: true,
            itemsPerPage,
            totalCv,
            cvs,
            count: filteredEmployeesNumber.length,
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}

exports.getSingleCvController = async (req, res, next) => {
    try {
        const cv = await Employee.findById(req.params.cvId).populate('userId', 'name email')
        if (!cv) {
            return res.status(404).json({
                errorMessage: "No Cv Found"
            })
        }

        // add number of views for other users except the cv owner

        console.log('req.user is: ', req.user)
        if (req.user) {
            if (req.user._id.toString() !== cv.userId._id.toString()) {
                cv.numOfViews.push(Date.now())
                cv.save({ validateBeforeSave: false })
            }
        } else {
            cv.numOfViews.push(Date.now())
            cv.save({ validateBeforeSave: false })
        }

        res.status(200).json({
            success: true,
            cv
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}
