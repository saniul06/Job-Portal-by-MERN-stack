const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`database connected at portttttttttt ${process.env.PORT}`)
    }).catch(err => {
        console.log(`database connection errrrrrrrrrrrrrror ${err}`)
    })
}

module.exports = connectDatabase