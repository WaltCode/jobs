const mongoose = require('mongoose')
const url= process.env.MONGO_URL

const connection = ()=>{
    const connectOptions = {
        useNewUrlParser : true,
        useUnifiedTopology: true
    }
    try {
        mongoose.connect(url, connectOptions)
        console.log("connected successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connection