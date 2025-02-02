const express = require('express');
const { addDepartment, getAllDepartments } = require('../controller/departmentControllers');
const router = express.Router();


router.post('/:id/add-department',addDepartment)
router.get('/:id/getallDepartment',getAllDepartments)

module.exports = router