const CompanySchema = require('../models/Company')
const EmployeeSchema = require('../models/Employee')
const DepartmentSchema = require('../models/Department')
const AdminSchema = require('../models/Admin')

// Compnay created by anyone
const addcompany = async(req,res,next)=>{
    try {
        const {
            Registration,
            Name,
            Description,
            Email,Phone,Website,Address,Headquarters,Founder
        }= req.body
        const Founder_name = Founder.Name;
        const company = new CompanySchema({
            Registration,
            Name,Description,Email,Phone,Website,Address,Headquarters,Founder:{Name:Founder_name}
        })
        await company.save();
        const password = `${Registration}@123`
        console.log(password);
        
        const admin = new AdminSchema({
            Name:Founder_name,Email,password,Role:"Company Admin",companyId:company._id,
        })
        await admin.save();
        console.log(admin.password);
        
        res.status(201).json({Message: "Company Created"});
    } catch (error) {
        res.send(error)
    }
    
}

const getAllCompany =async (req,res)=>{
    if(req.user.Role ==="Super Admin"){
        const company =  await CompanySchema.find()
        return res.send(company)
    }
    res.send("Not Authorized to fetch data")
}

const updateCompany = async(req,res)=>{
    if(req.user.Role==='Company Admin' || req.user.Role==='Super Admin'){
        const admin  = req.user;
        const company =  await CompanySchema.findById(admin.companyId);
        
        // Changes..............

        company.save();
        return res.send(company);
    }
    console.log(req.user);
    
}

const deleteCompany = async(req,res)=>{

    if(req.user.Role==='Company Admin' || req.user.Role==='Super Admin'){
        const admin  = req.user;
        const company =  await CompanySchema.findById(admin.companyId);
        await EmployeeSchema.deleteMany({company:company._id})
        await DepartmentSchema.deleteMany({company:company._id})
        await CompanySchema.findByIdAndDelete({_id:admin.companyId})
        return res.send("company deleted");
    }
    
    return res.send("Not a valid user to perform task");
}

module.exports = {
    addcompany,
    getAllCompany,
    updateCompany,
    deleteCompany
}