const app = require('./app')

const dotenv = require('dotenv')

const database = require('./config/database')

require('./config/database')

dotenv.config({ path: 'backend/config/config.env' })

database()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server connected at port ${process.env.PORT}`)
})

