const { validateEmployeeInput,comparePassword } = require("../Helpers/inputhelper");
const EmployeeSchema = require("../models/Employee")
const AdminSchema = require("../models/Admin")

const login = async(req ,res)=>{
    const {Email , password} = req.body;

    if(!(validateEmployeeInput(Email,password))){
        return res.status(400).json({
            message : "Please check your inputs"
        })
    }

    const employee = await EmployeeSchema.findOne({Email})
    
    if(!employee || !comparePassword(password,employee.password)){
        return res.status(404).json({
            message : "Invalid credentials"
        })
    }

    res.status(200).json({
        message:"user signed in" ,
        token : employee.generateJwtFromUser()
    })
}

const adminlogin = async(req ,res)=>{
    const {Email , password} = req.body;

    if(!(validateEmployeeInput(Email,password))){
        return res.status(400).json({
            message : "Please check your inputs"
        })
    }

    const admin = await AdminSchema.findOne({Email})
    
    if(!admin || !comparePassword(password,admin.password)){
        return res.status(404).json({
            message : "Invalid credentials"
        })
    }

    res.status(200).json({
        message:"user signed in" ,
        token : admin.generateJwtFromUser()
    })
}

module.exports = {login,adminlogin}