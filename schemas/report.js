const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')
const reportData = new mongoose.Schema({
    ChannelID: {
        type: String,
        required: true,
    },
    reportNumber: {
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
const reportSch = module.exports = model('Reports', reportData);