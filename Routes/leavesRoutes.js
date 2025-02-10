const express = require('express');
const { approveLeave, applyleave, rejectLeave } = require('../controller/leavesControllers');
const { updateLeave } = require('../controller/updateLeave');

const router = express.Router();

router.post('/applyleave',applyleave)
router.post('/approveleave',approveLeave)
router.post('/rejectleave',rejectLeave)
router.post('/updateleave',updateLeave)

module.exports =router