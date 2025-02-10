const {ObjectId} = require('bson')

const DepartmentSchema = require('../models/Department')
const CompanySchema = require('../models/Company')

const addDepartment = async(req,res)=>{
    try {
        if(req.user.Role==='Company Admin'){
            const admin = req.user
            const {
                departmentId,DepartmentName,Description,Email,Phone,ManagerId
            }  = req.body;
            const id = admin.companyId;
            // console.log(ManagerId);
            
            // const Manager = new ObjectId(ManagerId)
            // console.log(Manager);

            const Department =  new DepartmentSchema({
                departmentId,DepartmentName,Company:id,
                Description,ManagerId:admin._id,Email,Phone,
            })
            await Department.save();
            
            return res.send("Departmetn Created")
        }
        return res.send("You are not authorized to add department");
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