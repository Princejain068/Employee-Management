const dotenv = require('dotenv');
dotenv.config()
const jwt =require("jsonwebtoken")
const EmployeeSchema = require('../models/Employee');
const AdminSchema = require('../models/Admin');
const {istokenAvailable,getAccessTokenFromHeader} = require('../Helpers/tokens')

const routeaccess = async(req,res,next)=>{

    if(!(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
        return res.status(401).json({
            message: "You are not authorized to access this route"
        })
    }
    const {JWT_SECRET_KEY} =process.env ;
    const access_token = getAccessTokenFromHeader(req)

    try {
        const decoded = jwt.verify(access_token,JWT_SECRET_KEY) ;
        const user = await EmployeeSchema.findById(decoded.id)
        if(!user)return res.status(401).json({
            message: "You are not authorized to access this route"
        })
        req.user = user;
        next()  
    } catch (error) {
        res.send(error.message)
    }
}

const adminaccess = async(req,res,next)=>{
    if(!(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
        return res.status(401).json({
            message: "You are not authorized to access this route"
        })
    }

    const {JWT_SECRET_KEY}  = process.env;
    const access_token = getAccessTokenFromHeader(req);
    try{

        const decoded = jwt.verify(access_token,JWT_SECRET_KEY) ;
        const user = await AdminSchema.findById(decoded.id)
        if(!user)return res.send("You are not authorized to access this route");
        req.user = user;
        next();
    }
    catch(e){return res.send(e.message)}
}
module.exports = {routeaccess,adminaccess};