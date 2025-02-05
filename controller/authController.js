const { validateEmployeeInput,comparePassword } = require("../Helpers/inputhelper");
const EmployeeSchema = require("../models/Employee")

const login = async(req ,res)=>{
    const {EmployeeID , password} = req.body;

    if(!(validateEmployeeInput(EmployeeID,password))){
        return res.status(400).json({
            message : "Please check your inputs"
        })
    }

    const employee = await EmployeeSchema.findOne({EmployeeID})
    
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


module.exports = {login}