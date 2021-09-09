const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    video: {
        webContentLink: {
            type: String,
            required: true
        },
        webViewLink: {
            type: String,
            required: true
        },
        videoId: {
            type: String,
            required: true
        },
        instagramLink: {
            type: String
        }
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    state: {
        type: String,
    },
    experience: {
        type: Number,
    },
    availability: {
        type: String,
    },
    isApproved: {
        type: Number,
        default: 0
    },
    isActivated: {
        type: Number,
        default: 0
    },
    numOfViews: [Date],
    favorites: [
        {
            employerId: {
                type: mongoose.ObjectId,
                ref: 'Employer'
            },
            time: Date
        }
    ],
    deactivateDate: {
        type: Date,
        default: new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())
    }
}, { timestamps: true })

module.exports = mongoose.model('Employee', employeeSchema)