
const job = require("../models/Jobs")


const getAllJobs = async (req, res) => {
    res.status(200).json({
        data: jobs,
        success : true})
}


const createJob = async (req, res) =>{
    res.status(200).json({
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