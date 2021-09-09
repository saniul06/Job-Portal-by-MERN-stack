const express = require('express')

const cors = require('cors')

const cookieParser = require('cookie-parser')

const morgan = require('morgan')

const dotenv = require('dotenv')

const fileUpload = require('express-fileupload')

dotenv.config({ path: 'backend/config/config.env' })

const app = express()

app.use(morgan('tiny'))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(fileUpload())

app.use(cors())

app.use(cookieParser())

//import routes

const auth = require('./routes/authRoutes')
const admin = require('./routes/adminRoutes')
const employee = require('./routes/employeeRoutes')
const employer = require('./routes/employerRoutes')
const public = require('./routes/publicRoutes')

app.use('/api', auth, admin, employee, employer, public)

module.exports = app