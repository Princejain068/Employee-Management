const CompanySchema = require('../models/Company')
const EmployeeSchema = require('../models/Employee')
const DepartmentSchema = require('../models/Department')
const AdminSchema = require('../models/Admin')

// Compnay created by anyone
const addcompany = async(req,res,next)=>{
    try {
        const {
            Registration,
            CompanyName,
            Description,
            Email,Phone,Website,Address,Headquarters,Founder,
            AdminPhone,AdminAddress,AdminEmail,AdminAge,AdminDateOfBirth,
            Gender
        
        }= req.body
        const Founder_name = Founder.Name;
        const company = new CompanySchema({
            Registration,
            Name:CompanyName,Description,Email,Phone,Website,Address,Headquarters,Founder:{Name:Founder_name}
        })
        await company.save();
        
        const password = `${Registration}@123`
        
        const admin = new AdminSchema({
            Name:Founder_name,Email:AdminEmail
            ,password,Role:"Company Admin",companyId:company._id,
        })
        await admin.save();
        
        const department = new DepartmentSchema({
            departmentId:`Admin${Registration}001`,
            DepartmentName:'Admin',Company: company._id,
            Description:"Admin functionality",
            ManagerId:admin._id,Email,Phone
        })
        await department.save();
        const employee =  new EmployeeSchema({
            EmployeeID: 'ad001',
            password : `${Registration}@123`,
            Company: company._id,
            Department:department._id,
            Role:"Company Admin",Name:Founder_name,Gender,DateOfBirth: AdminDateOfBirth,
            Address:AdminAddress,Age:AdminAge,Email:AdminEmail,Phone:AdminPhone,Email:AdminEmail
        })
        await employee.save();
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
        
        for(key in req.body){
            if(req.body[key] && key!=='user')company[key]=req.body[key];
        }
        
        company.save();
        return res.send(company);
    }
    
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