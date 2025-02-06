const express = require('express');
const { addcompany, updateCompany, deleteCompany } = require('../controller/companyControllers');
const { getAllDepartments } = require('../controller/departmentControllers');
const { adminaccess } = require('../middlewares/authmiddleware');
const router = express.Router();


router.post('/addcompany',addcompany)
router.post('/getalldepartments',adminaccess,getAllDepartments)
router.put('/updatecompany',adminaccess,updateCompany)
router.delete('/deletecompany',adminaccess,deleteCompany)

module.exports = router