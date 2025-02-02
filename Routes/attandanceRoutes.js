const express = require('express');
const { markAttandance, fetechReport } = require('../controller/attandanceControllers');

const router = express.Router();


router.post('/attendance',markAttandance)
router.get('/attendance/report/:employeeId',fetechReport)


module.exports = router