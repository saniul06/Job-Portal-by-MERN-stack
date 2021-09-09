const mongoose = require('mongoose')

const employerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    country: String,
    phone: String,
    jobAlerts: []
}, { tiemstamps: true })

module.exports = mongoose.model('Employer', employerSchema)