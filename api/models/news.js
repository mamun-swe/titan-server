const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
    title: { type: String, trim: true },
    content: { type: String, trim: true },
    file: { type: String, trim: true },
    date: { type: Date, trim: true }
})


const newsModel = mongoose.model('news', newsSchema)
module.exports = newsModel