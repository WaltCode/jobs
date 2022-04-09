const Jobs = require("../models/Jobs")
const {StatusCodes} = require('http-status-codes')

const getAllJobs = async (req, res) => {
    const {userId} = req.user
    const jobs = Jobs.find({creator: userId})
    res.status(200).json({

        data: 'we got the jobs for '+ userId,
        success : true})
}


const createJob = async (req, res) =>{
    req.body.creator = req.user.userId
    const {company, position, status, creator} = req.body
    
    if(!company){
        return res.status(StatusCodes.NO_CONTENT).json({
            message: "Please provide company's name"
        })
    }
    if(!position){
        return res.status(StatusCodes.NO_CONTENT).json({
            message: "Please provide applied position"
        })
    }
    const job = await Jobs.create({...req.body})
    res.status(200).json({
        job,
        message: "successfully created",
        success: true
            })
    
}

const getJob = async (req, res) => {
    res.status(200).json({
        data: job,
        success : true})
}


const editJob = async (req, res) =>{
    res.status(200).json({
        message: "successfully edited",
        success: true
    })
}

const deleteJob = async (req, res) => {
    res.status(200).json({
        message: "successfully deleted",
        success : true})
}





module.exports = {getAllJobs, getJob,createJob, editJob, deleteJob}