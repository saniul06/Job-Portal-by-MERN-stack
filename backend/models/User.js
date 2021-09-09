const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        max: [30, 'name cann"t exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: [true, 'Email already in use'],
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password cann"t be empty'],
        minlength: [6, 'Password must be longer than 5 characters'],
        select: false
    },
    avatar: {
        webContentLink: {
            type: String,
        },
        webViewLink: {
            type: String,
        },
        avatarId: {
            type: String,
        }
    },
    role: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Number,
        default: 0
    },
    verificationCode: {
        type: String,
    },
    expiresIn: {
        type: Date,
        default: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours() + 2)
    }
}, { timestamps: true })

// Encrypt password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Create jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({
        _id: this._id,
        role: this.role
    },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
    )
}

module.exports = mongoose.model('User', userSchema)