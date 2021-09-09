const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        retuired: true,
        trim: true,
        unique: true
    },
    parentId: {
        type: mongoose.ObjectId,

    }
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)