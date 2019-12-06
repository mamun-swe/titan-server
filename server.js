const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb+srv://mamun:mamun166009@cluster0-vxoak.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("DB server connect"))
.catch(e => console.log("DB error", e));
var db = mongoose.connection;
if(!db)
console.log("Error connecting db")
else
console.log("Db connected successfully")

// const db = mongoose.connection
// db.on('error', (err) => {
//     console.log(err)
// })
// db.once('open', () => {
//     console.log('MongoDB connection success')
// })




const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


app.use('/uploads/banner', express.static('uploads/banner/'));
app.use('/uploads/company', express.static('uploads/company/'));
app.use('/uploads/team', express.static('uploads/team/'));
app.use('/uploads/news', express.static('uploads/news/'));
const adminRoute = require('./api/routes/admin')
const userRoute = require('./api/routes/client')
app.use('/api/admin', adminRoute)
app.use('/api/user', userRoute)

const port = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send('I am root route')
})

app.listen(port, () => {
    console.log(`Server running on ${port} port`)
})