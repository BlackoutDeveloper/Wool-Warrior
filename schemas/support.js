const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')
const supportData = new mongoose.Schema({
    ChannelID: {
        type: String,
        required: true,
    },
    supportNumber: {
        type: Number,
        required: true,
    },
    UserID: {
        type: String,
        required: true,
    },
    tNumber: {
        type: Number,
        required: true,
    }
})
const supportSch = module.exports = model('Supports', supportData);