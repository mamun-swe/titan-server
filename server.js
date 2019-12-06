const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb+srv://mamun:8yyLxSIJ8hPDdwZ9@cluster0-vxoak.mongodb.net/test?retryWrites=true&w=majority/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected')
})




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