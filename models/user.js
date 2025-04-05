const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    message: String,
})
const userModel = mongoose.model('user', userSchema)

module.exports = userModel