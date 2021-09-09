const mongoose = require('mongoose');

const variableSchema = mongoose.Schema({
    MaxVideoSize: {
        type: Number,
        required: true,
        default: 80
    }
})

module.exports = mongoose.model('Variable', variableSchema)