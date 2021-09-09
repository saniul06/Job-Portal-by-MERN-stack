const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken()

    const options = {
        expires: new Data(
            Data.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken