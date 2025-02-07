const express = require('express');
const { addDepartment, getAllDepartments } = require('../controller/departmentControllers');
const { adminaccess, routeaccess } = require('../middlewares/authmiddleware');
const router = express.Router();


router.post('/add-department',adminaccess,addDepartment)
router.get('/:id/getallDepartment',getAllDepartments)

module.exports = router