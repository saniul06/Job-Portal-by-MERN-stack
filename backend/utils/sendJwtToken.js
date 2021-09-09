const sendJwtToken = (user, statusCode, res, employee) => {
    const token = user.getJwtToken()

    const options = {
        expires: Date.now() + '7D' * 24 * 60 * 60 * 1000,
        httpOnly: true
    }

    res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user,
        employee
    })
}

module.exports = sendJwtToken