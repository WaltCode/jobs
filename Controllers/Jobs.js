const Jobs = require("../models/Jobs")
const {StatusCodes} = require('http-status-codes')

const getAllJobs = async (req, res) => {
    const {userId} = req.user
    const jobs = await Jobs.find({creator: userId})
    try {
        res.status(StatusCodes.OK).json({
            data: {
                counts: jobs.length,
                jobs,},
            success : true})
    } catch (error) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json(error)
    }
}


const createJob = async (req, res) =>{
    req.body.creator = req.user.userId
    try {
        const job = await Jobs.create({...req.body})
        res.status(StatusCodes.CREATED).json({
            job,
            message: "successfully created",
            success: true
        })
    } catch (error) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json(error)
    }
    
}

const getJob = async (req, res) => {
    const {userId} = req.user
    const jobId = req.params.id
    try {
        const job = await Jobs.findById({ creator: userId, _id: jobId})
        if(!job){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "No job with id" + jobId
            })
        }
        res.status(200).json({
            data: job,
            success : true})
    } catch (error) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json(error.message)
    }
}


const editJob = async (req, res) =>{
    const {userId} = req.user
    const jobId = req.params.id
    const { company, position} = req.body
    try {
        if(company === "" || position === ""){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please provide company name or position"
            })
        }
        const job = await Jobs.findByIdAndUpdate({ creator: userId, _id: jobId},
             req.body, 
             {new: true, runValidators:true}) 

        if(!job){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: `There is no job with the Id ${jobId}`
            })
        }
        res.status(200).json({
            job,
            message: "successfully edited",
            success: true
        })
    } catch (error) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json(error.message)
    }
   
}

const deleteJob = async (req, res) => {
    const jobId = req.params.id
    const {userId} = req.user
    try {
        const job = await Jobs.findByIdAndDelete({
            creator: userId,
            _id: jobId
        })
        if(!job){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: `There is no job with the Id ${jobId}`
            })
        }
        res.status(200).json({
            message: `job with ID ${jobId} was successfully deleted`,
            success : true})
    } catch (error) {
        
    }
    
}





module.exports = {getAllJobs, getJob,createJob, editJob, deleteJob}