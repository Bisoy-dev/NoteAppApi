const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add your password']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)