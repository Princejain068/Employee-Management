const express = require('express');
const { getAllCompany, addcompany } = require('../controller/companyControllers');
const { getAllEmployee } = require('../controller/employeeControllers');
const { getAllDepartments } = require('../controller/departmentControllers');
const router = express.Router();


router.get('/get-all-company',getAllCompany)
router.get('/get-all-employee',getAllEmployee)
router.post('/addCompany',addcompany)
router.post('/getalldepartments',getAllDepartments)

module.exports = router