const User = require('../models/Users')
const JWT = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')


const isAuthorised = async (req, res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Access denied"
        })
    }
    const token = await authHeader.split(' ')[1]
 
    try {
        const payload = await JWT.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId}
        next()
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = isAuthorised