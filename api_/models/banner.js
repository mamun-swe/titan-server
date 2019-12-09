const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bannerSchema = new Schema({
    file: { type: String, trim: true }
})


const bannerModel = mongoose.model('banner', bannerSchema)
module.exports = bannerModel