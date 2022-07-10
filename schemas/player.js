const db = require('mongoose')
const { Schema, model } = require('mongoose')
const playerSchema = new Schema({
    ign: {
        type: String,
        required: false,
    },
    uuid: {
        type: String,
        required: false,
    }, 
    userID: {
        type: String,
        required: true,
    },
    wins: {
        type: String,
        required: false,
    },
    bp: {
        type: String,
        required: false,
    },
    bb: {
        type: String,
        required: false,
    },
    power: {
        type: String,
        required: false,
    },
    verified: {
        type: Boolean,
        required: false,
    },
    kills: {
        type: String,
        required: false
    },
    assist: {
        type: String,
        required: false
    }
})
const profileModel = module.exports = model('Profiles', playerSchema);