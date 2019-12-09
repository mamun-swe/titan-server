
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const socialSchema = new Schema({
    striming: { type: String, trim: true },
    facebook: { type: String, trim: true },
    instagram: { type: String, trim: true },
    discord: { type: String, trim: true },
    youtube: { type: String, trim: true }
})


const socialModel = mongoose.model('social', socialSchema)
module.exports = socialModel

