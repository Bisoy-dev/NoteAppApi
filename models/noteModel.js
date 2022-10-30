const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    title: {
        type: String,
        required: [true, 'Please add title']
    },
    description: {
        type: String,
        required: [true, 'Please add description']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('notes', noteSchema)