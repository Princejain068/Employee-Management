const express = require('express');
const { getAllCompany, addcompany } = require('../controller/companyControllers');
const { getAllEmployee } = require('../controller/employeeControllers');
const { getAllDepartments } = require('../controller/departmentControllers');
const {adminaccess} = require('../middlewares/authmiddleware')
const router = express.Router();

router.get('/get-all-company',adminaccess,getAllCompany)
router.get('/get-all-employee',adminaccess,getAllEmployee)
router.post('/getalldepartments',getAllDepartments)

module.exports = router