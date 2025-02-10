const AvailableLeaveSchema = require('../models/AvailableLeaves')

const updateLeave = async(req,res,next)=>{
    const user = req.user;
    if(user.Role === 'HR'){
        const {Casual,Sick,
            Maternity,
            Paternity,
            Privilege,
            Bereavement,
            Compensatory,
            Unpaid,employeeId}=req.body;
        
        const leaves =await AvailableLeaveSchema.findOne({Employee:employeeId}); 

        for(const key in req.body){
            if(req.body[key] && key!= 'employeeId'){
                leaves[key] = req.body[key];          
            }
            await leaves.save();
        }
        return res.send("Leaves updated")
    }
    return res.send("Not Authorized to perform this task")
} 

module.exports = {updateLeave}