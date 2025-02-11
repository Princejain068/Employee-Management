const EmployeeSchema = require('../models/Employee')
const CompanySchema = require('../models/Company');
const DepartmentSchema = require('../models/Department');
const AvailableLeaveSchema = require('../models/AvailableLeaves')
const {ObjectId} = require('bson')

const addEmployee = async (req,res,next) => {
    try {
        if(!(req.user.Role === "HR" || req.user.Role === "Company Admin"))return res.send("You are not authorized to add an employee");
        const {
            EmployeeID,
            Name,
            Gender,
            DateOfBirth,
            Age,Email,Phone,Address,Department_id,Role
            
        } =req.body;
        
        const company =  await CompanySchema.findById(req.user.Company);
        
        const password = `${Name}@${EmployeeID}`
        
        const departmentId = new ObjectId(Department_id);
    
        

        const department = await DepartmentSchema.findById(departmentId);
        const employee = new EmployeeSchema({
            EmployeeID,
            Company:company._id,
            Name,Gender,DateOfBirth,Age,Email,Phone,Address,
            Department : department._id,
            Manager : department.ManagerId,
            Role,password
        })
        await employee.save();
        const leaves = new AvailableLeaveSchema({
            Employee:employee._id,Casual:10,
            Sick:10,
            Maternity:10,
            Paternity:10,
            Privilege:10,
            Bereavement:10,
            Compensatory:10,
            Unpaid:10,
        })
        await leaves.save();
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
        const user = req.user;
        if(user.Role==='Super Admin'){
        const employees = await EmployeeSchema.find();
        return res.status(200).json({
            employees
        })
        }
        return res.send("You are not a super admin")
    } catch (error) {
        return res.send(error.message)
    }
}

const getEmployees = async(req,res)=>{
    if(!req.user.Role==='HR' && !req.user.Role==='Company Admin')return res.send("Not allowed to fetch all employess");
    const id = req.user.Company;
    const employee = await EmployeeSchema.find({Company:id})
    return res.send(employee)
}

const updateEmployee = async (req,res)=>{
    try {
        if(req.user.Role ==='HR' || req.user.Role==='Company Admin'){
            const employeeId = req.body.EmployeeID;
            const employee = await EmployeeSchema.findOne({EmployeeID:employeeId , Company:req.user.Company});
            if(!employee)return res.send("No such employee exist");

            for(key in req.body){
                if(req.body[key]){
                    employee[key] = req.body[key];
                }
            }
            await employee.save()
            res.send("Employee updated")
        }
        return res.send("Not Authorozed to perform this action")
    } catch (error) {
        
    }
}

const deleteEmployee = async(req,res)=>{
    try {
        if(req.user.Role ==='HR' || req.user.Role==='Company Admin'){
            const employeeId = req.body.EmployeeID;
            const employee  = await EmployeeSchema.findOne({EmployeeID:employeeId , Company:req.user.Company});
            if(employee.Role==='Company Admin')return res.send("Not allowed to remove");
            if(!employee)return res.send("No such employee exist");
            const employee1  = await EmployeeSchema.findOneAndDelete({EmployeeID:employeeId , Company:req.user.Company});

            if(employee1.deletedCount==0)res.send("No such Employee existed");
            return  res.send("Employee deleted")
        }
        return res.send("Not Authorozed to perform this action")

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