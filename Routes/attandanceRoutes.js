const express = require('express');
const { markAttandance, fetechReport } = require('../controller/attandanceControllers');
const { routeaccess, adminaccess } = require('../middlewares/authmiddleware');

const router = express.Router();


router.post('/attendance',routeaccess,markAttandance)
router.get('/attendance/report',routeaccess,fetechReport)


module.exports = router