const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bannerSchema = new Schema({
    link: { type: String, trim: true },
    file: { type: String, trim: true }
})


const bannerModel = mongoose.model('companie', bannerSchema)
module.exports = bannerModel