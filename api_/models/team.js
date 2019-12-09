const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    name: { type: String, trim: true },
    about: { type: String, trim: true },
    file: { type: String, trim: true },
    date: { type: Date, trim: true }
})


const teamModel = mongoose.model('team', teamSchema)
module.exports = teamModel