const EmployeeSchema = require('../models/Employee')
const CompanySchema = require('../models/Company');
const DepartmentSchema = require('../models/Department');

const addEmployee = async (req,res) => {
    try {
        const {id} = req.params
        const {
            EmployeeID,
            Name,
            Gender,
            DateOfBirth,
            Age,Email,Phone,Address,Department_id
        } =req.body;
        console.log(Department_id);
        
        const company =  await CompanySchema.findOne({Registration:id});
        const department = await DepartmentSchema.findById(Department_id);
        if(!department){
            const employee = new EmployeeSchema({
                EmployeeID,
                Company:company._id,
                Name,Gender,DateOfBirth,Age,Email,Phone,Address,
            })
            await employee.save();
            return res.send("Employee created")
        }
        const employee = new EmployeeSchema({
            EmployeeID,
            Company:company._id,
            Name,Gender,DateOfBirth,Age,Email,Phone,Address,
            Department : department._id,
            Manager : department.ManagerId
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
    const {id} = req.params
    const company = await CompanySchema.findOne({Registration:id})
    if(!company)return res.send("No such Company")
    const employee = await EmployeeSchema.find({Company:company._id})
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