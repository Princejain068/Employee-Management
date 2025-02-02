const express = require('express');
const { addEmployee, getAllEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controller/employeeControllers');
const router = express.Router();


router.post('/:id/add-employee',addEmployee)
router.get('/get-employees/:id',getEmployees)
router.put('/update-employee',updateEmployee)
router.delete('/delete-employee',deleteEmployee)
module.exports =router