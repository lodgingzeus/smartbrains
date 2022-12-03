const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    entries: Number
})

module.exports = mongoose.model('Users', usersSchema, 'users')