const CompanySchema = require('../models/Company')
const EmployeeSchema = require('../models/Employee')
const DepartmentSchema = require('../models/Department')


const addcompany = async(req,res)=>{
    try {
        const {
            Registration_number,
            Name,
            Description,
            Email,Phone,Website,Address,Headquarters,CEO_Name,
        }= req.body
        const company = new CompanySchema({
            Registration:Registration_number,
            Name,Description,Email,Phone,Website,Address,Headquarters,CEO:{Name:CEO_Name}
        })
        await company.save();
        res.status(201).json({Message: "Company Created"});
    } catch (error) {
        res.send(error)
    }
    
}

const getAllCompany =async (req,res)=>{
    let company =  await CompanySchema.find()
    return res.send(company)
}

const updateCompany = async(req,res)=>{
    let company =  await CompanySchema.findOne({Registration:1});
    company.Registration =2;
    company.save();
    return res.send(company);
}

const deleteCompany = async(req,res)=>{
    const company = await CompanySchema.findOne({Registration:req.body.Registration_number});
    await EmployeeSchema.deleteMany({company:company._id})
    await DepartmentSchema.deleteMany({company:company._id})
    await CompanySchema.deleteOne({Registration:req.body.Registration_number})
    return res.send("comany deleted");
}

module.exports = {
    addcompany,
    getAllCompany,
    updateCompany,
    deleteCompany
}