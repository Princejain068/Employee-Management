const DepartmentSchema = require('../models/Department')
const CompanySchema = require('../models/Company')

const addDepartment = async(req,res)=>{
    try {
        const {
            departmentId,DepartmentName,Description,Email,Phone,ManagerId
        }  = req.body;
        const {id} = req.params
        const company = await CompanySchema.findOne({Registration:id})
        const Department =  new DepartmentSchema({
            departmentId,DepartmentName,Company:company._id,
            Description,ManagerId,Email,Phone,
        })
        await Department.save();
        res.send("Departmetn Created")

    } 
    catch (error) {
        res.send(error.message)
    }
}

const getAllDepartments = async(req,res)=>{
    const {id}  = req.params
    const company = await CompanySchema.findOne({Registration:21})
    const departments = await DepartmentSchema.find({ Company:company._id});
    res.send(departments)
}

module.exports = {
    addDepartment,
    getAllDepartments
}