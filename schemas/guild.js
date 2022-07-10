const db = require('mongoose')
const { Schema, model } = require('mongoose')
const guildDocu = new Schema ({
    supportCount: {
        type: Number,
        required: true,
        default: 0,
    },
    reportCount: {
        type: Number,
        required: true,
        default: 0,
    },
    ID: {
        type: Number,
        required: true,
        default: 0,
    },
    tCount: {
        type: Number,
        required: true,
        default: 0,
    },
    sCount: {
        type: Number,
        required: true,
        default: 0,
    }
})

const guildDoc = module.exports = model('general', guildDocu);