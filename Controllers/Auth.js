// require('dotenv').config()
const User = require('../models/Users')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    
    const user = await User.create({...req.body})
    const token = await jwt.sign({
        userId:user._id,
        name: user.name
    }, process.env.JWTSECRET, {expiresIn: "1d"})
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
    res.status(200).json({
        message: "User logged in",
        success: true
    })
}


module.exports = {register, login}