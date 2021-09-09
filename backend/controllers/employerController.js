const Employer = require('../models/Employer')
const Employee = require('../models/Employee')
const ApiFeatures = require('../utils/ApiFeatures')

exports.favoriteController = async (req, res, next) => {
    try {
        const { cvId } = req.body
        const cv = await Employee.findById(cvId)

        if (!cv) {
            return res.status(404).json({
                errorMessage: "Cv not found"
            })
        }

        let message

        const isFavorite = cv.favorites.find(favorite => favorite.employerId.toString() === req.user._id.toString())

        if (isFavorite) {
            cv.favorites = cv.favorites.filter(favorite => favorite.employerId.toString() !== req.user._id.toString())
            message = "Removed Successfully"
        } else {
            cv.favorites.push({ employerId: req.user._id, time: Date.now() })
            message = "Added Successfully"
        }

        cv.save()

        res.status(200).json({
            success: true,
            message
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}

exports.getFavoriteCvController = async (req, res, next) => {
    try {

        const itemsPerPage = 3
        const apiFeatures = new ApiFeatures(Employee, req.query).filter()

        const filteredEmployeesNumber = await apiFeatures.collection.find({ 'favorites.employerId': req.user._id }).populate('userId', 'name email')

        apiFeatures.pagination(itemsPerPage)

        const favCvs = await apiFeatures.collection

        if (!favCvs) {
            return res.status(404).json({
                message: "No Cv found"
            })
        }

        res.status(200).json({
            favCvs,
            count: filteredEmployeesNumber.length,
            itemsPerPage
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "Internal server error"
        })
    }
}