
const mongoose = require("mongoose")

const jobSchema =new mongoose.Schema({
    company:{
        type: String,
        required: [true,"Please provide a name"],
        maxlength: 50
    },
    position:{
        type: String,
        required: [true, "please provide a position"],
        maxlength: 100
    },
    status:{
        type: String,
        enum: ['pending', 'declined', 'interview'],
        default: "pending"
    },
    creator:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true,"Please provie a user"]
    }

},{timestamps:true})



module.exports= mongoose.model("Jobs",jobSchema)