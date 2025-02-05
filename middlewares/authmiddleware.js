const dotenv = require('dotenv');
dotenv.config()
const jwt =require("jsonwebtoken")
const EmployeeSchema = require('../models/Employee')

const routeaccess = async(req,res,next)=>{

    if(!(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {

        return res.status(401).json({
            message: "You are not authorized to access this route"
        })
    }
    const {JWT_SECRET_KEY} =process.env ;
    const authorization = req.headers.authorization
    const access_token = authorization.split(" ")[1]
    const decoded = jwt.verify(access_token,JWT_SECRET_KEY) ;
    const user = await EmployeeSchema.findById(decoded.id)

    if(!user)return res.status(401).json({
        message: "You are not authorized to access this route"
    })
    
    req.user = user;
    next()
}

module.exports = {routeaccess};