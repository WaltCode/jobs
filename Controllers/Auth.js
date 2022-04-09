// require('dotenv').config()
const User = require('../models/Users')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        message: "User successfully registered",
        data: {
            name:user.name,
            token
        },
        success : true
    })
}


const login = async (req, res) =>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please provide the correct email or password"
        })
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid Credentials "
        })
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid Credentials "
        })
    }
    const token = user.createJWT()
    res.status(200).json({
        message: "User logged in",
        token,
        success: true
    })
}


module.exports = {register, login}