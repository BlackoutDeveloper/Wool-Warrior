const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')
const ticketData = new mongoose.Schema({
    ChannelID: {
        type: String,
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
const ticketSchema = module.exports = model('Tickets', ticketData);