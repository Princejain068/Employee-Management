const express = require('express');
const { approveLeave, applyleave, rejectLeave } = require('../controller/leavesControllers');
const router = express.Router();


// router.post('/applyleave',approveLeave)
router.post('/applyleave',applyleave)
router.post('/approveleave',approveLeave)
router.post('/rejectleave',rejectLeave)

module.exports =router