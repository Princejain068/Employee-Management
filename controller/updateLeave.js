const AvailableLeaveSchema = require('../models/AvailableLeaves')

const updateLeave = async(req,res,next)=>{
    const {Casual,Sick,
    Maternity,
    Paternity,
    Privilege,
    Bereavement,
    Compensatory,
    Unpaid,employeeId}=req.body;

    const leaves =await AvailableLeaveSchema.findOne({Employee:employeeId});
    if(!leaves){
        const newentry = new AvailableLeaveSchema({
            Employee:employeeId,
            Casual,Sick,
            Maternity,
            Paternity,
            Privilege,
            Bereavement,
            Compensatory,
            Unpaid
        })
        await newentry.save();
        return res.send("Leaves are set for employee")
    }

            
    for(const key in req.body){
        if(req.body[key] && key!= 'employeeId'){
            leaves[key] = req.body[key];          
        }
        await leaves.save();
    }
    return res.send("Leaves updated")
} 

module.exports = {updateLeave}