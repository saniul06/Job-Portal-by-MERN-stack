const nodemailer = require('nodemailer')

const sendEmail = async (options, res) => {
    // const transport = nodemailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     auth: {
    //         user: process.env.SMTP_USER,
    //         pass: process.env.SMTP_PASSWORD
    //     }
    // })

    try {
        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        const message = {
            from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
            to: options.email,
            subject: options.subject,
            html: options.message
        }

        await transport.sendMail(message)
    } catch (err) {
        console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii ammmmmmmmmmmmmmmmmmmmmmmmmm')
        console.log(err)
        return res.status(500).json({
            success: false,
            errorMessage: "Sending email failed"
        })
    }
}

exports.sendVerificationEmail = (verificationCode, user, res) => {
    const message = `Hi ${user.name.split(' ')[0]}, <br /> Please confirm your email with this verification code <br /> <br /> <span style="font-size: 20px; font-weight:bold">${verificationCode}</span> <br /> <br /> If you have not requested this email, then ignore it.`

    sendEmail({
        email: user.email,
        subject: 'Email Verification',
        message
    },
        res)
}

exports.sendEmailToEmployee = (employee, res) => {
    const message = `Hi ${employee.name.split(' ')[0]}, <br /> ${employee.body}`

    sendEmail({
        email: employee.email,
        subject: employee.subject,
        message
    },
        res)
}