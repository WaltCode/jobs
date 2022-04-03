const router = require('express').Router()
const {getAllJobs, getJob, createJob, editJob, deleteJob} = require('../Controllers/Jobs')


router.route('/jobs') .get(getAllJobs).post(createJob)
router.route('/job/:id') .get(getJob) .delete( deleteJob) .patch(editJob)


module.exports = router
      