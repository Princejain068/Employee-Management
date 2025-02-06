const express = require('express');
const { addEmployee, getAllEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controller/employeeControllers');
const { routeaccess, adminaccess } = require('../middlewares/authmiddleware');
const router = express.Router();


router.post('/add-employee',routeaccess,addEmployee)
router.get('/get-employees/:id',routeaccess,getEmployees)
router.put('/update-employee',updateEmployee)
router.delete('/delete-employee',deleteEmployee)

module.exports =router