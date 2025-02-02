const express = require('express');
const { addcompany, updateCompany, deleteCompany } = require('../controller/companyControllers');
const { getAllDepartments } = require('../controller/departmentControllers');
const router = express.Router();


router.get('/addcompany',addcompany)
router.post('/getalldepartments',getAllDepartments)
router.put('/updatecompany',updateCompany)
router.delete('/deletecompany',deleteCompany)

module.exports = router