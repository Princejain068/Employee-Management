const EmployeeSchema = require('../models/Employee')
const CompanySchema = require('../models/Company');
const DepartmentSchema = require('../models/Department');
const bcrypt = require('bcryptjs')

const addEmployee = async (req,res,next) => {
    try {
        console.log(req.user);
        
        if(!(req.user.Role === "HR" || req.user.Role === "Admin"))return res.send("You are not authorized to add an employee");
        const {
            EmployeeID,
            Name,
            Gender,
            DateOfBirth,
            Age,Email,Phone,Address,Department_id,Role
            
        } =req.body;
        
        const company =  await CompanySchema.findById(req.user.Company);
        
        const password = `${Name}@${EmployeeID}`
        
        if(!Department_id){
            const employee = new EmployeeSchema({
                EmployeeID,
                Company:company._id,
                Name,Gender,DateOfBirth,Age,Email,Phone,Address,
                password,Role
            })
        
            
            await employee.save();
            

            return res.send("Employee created")
        }

        const department = await DepartmentSchema.findById(Department_id);
        const employee = new EmployeeSchema({
            EmployeeID,
            Company:company._id,
            Name,Gender,DateOfBirth,Age,Email,Phone,Address,
            Department : department._id,
            Manager : department.ManagerId,
            Role,password
        })
        
        await employee.save();

        return res.status(201).json({
            success:true,
            message:"Employee Created"
        })
    } 
    catch (error) {
        return res.send(error)
    }
}

const getAllEmployee = async (req,res)=>{
    try {
        const employees = await EmployeeSchema.find();
        return res.status(200).json({
            employees
        })
    } catch (error) {
        return res.send("Kuch to gadbad hai")
    }
}

const getEmployees = async(req,res)=>{
    if(!req.user.Role==='HR')return res.send("Not allowed to fetch all employess");
    const id = req.user.company;
    const employee = await EmployeeSchema.find({Company:id})

    
    
    res.send(employee)
}

const updateEmployee = async (req,res)=>{
    try {
        const employee = await EmployeeSchema.findOne({EmployeeID:req.body.EmployeeID})
        const {department, Manager} = req.body
        if(department) employee.Department = department
        if(Manager) employee.Manager = Manager
        await employee.save()
        res.send("Employee updated")
    } catch (error) {
        
    }
}

const deleteEmployee = async(req,res)=>{
    try {
        const employee  = await  EmployeeSchema.deleteOne({_id:req.body.id});
        if(employee.deletedCount==0)res.send("No such Employee existed");
        else res.send("Employee deleted")
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {
    addEmployee,
    getAllEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
}