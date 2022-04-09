const router = require('express').Router()
const {getAllJobs, getJob, createJob, editJob, deleteJob} = require('../Controllers/Jobs')


router.route('/') .get(getAllJobs).post(createJob)
router.route('/:id') .get(getJob) .delete( deleteJob) .patch(editJob)


module.exports = router
      