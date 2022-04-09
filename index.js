require('dotenv').config()
const express = require("express")
const app = express()
const connectDB = require('./connectDB')
const jobRoute = require('./Routes/Jobs')
const userRoute = require('./Routes/Auth')
const { json } = require('express/lib/response')
const isAuthorised = require('./Middleware/authorization')
const morgan = require('morgan')

app.use(express.json())
// connect to database
connectDB()

// routes
app.use('/api/v1/auth', userRoute )
app.use('/api/v1/jobs', isAuthorised, jobRoute )




app.use(morgan('tiny'))

// running the server
app.listen(3000, ()=> {
    console.log(`i am running on port ${process.env.PORT}`)
})