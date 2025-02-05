const express = require('express');
const { login } = require('../controller/authController');
const router = express.Router();

router.post("/signin",login)


module.exports = router;