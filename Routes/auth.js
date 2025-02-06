const express = require('express');
const { login, adminlogin } = require('../controller/authController');
const router = express.Router();

router.post("/signin",login)
router.post("/admin/signin",adminlogin)


module.exports = router;