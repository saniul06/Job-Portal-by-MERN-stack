const User = require('../models/User')

const jwt = require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                errorMessage: 'Login first to access the resource'
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decode._id)

        next()

    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: 'Jwt token error'
        })
    }
}

exports.authorizeRoles = (...role) => (
    (req, res, next) => {
        try {
            if (!role.includes(req.user.role)) {
                return res.status(403).json({
                    errorMessage: `Role ${req.user.role} is not allowed to access the resource`
                })
            }

        } catch (err) {
            return res.status(500).json({
                errorMessage: "Internal server error"
            })
        }

        next()
    }
)

