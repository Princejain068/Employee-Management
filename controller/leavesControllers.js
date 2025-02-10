const LeaveSchema = require('../models/Leaves')
const EmployeeSchema = require('../models/Employee');
const AvailableLeaveSchema = require('../models/AvailableLeaves');
const date = require('date-and-time');


const applyleave = async(req,res)=>{
    try {
        const user = req.user;
        const {start_date , end_date ,leaveReason,typeOfLeave} = req.body
        const employee = await EmployeeSchema.findById(user._id);
        const AvailableLeave = await AvailableLeaveSchema.findOne({Employee:user._id});
        
        if(AvailableLeave[typeOfLeave]> start_date-end_date){
            return res.send("You don't have suuficient leaves to apply")
        }
        const leave = new LeaveSchema(
            {
                start_date,
                end_date,
                leaveReason,
                status:'Recieved',
                employee:employee._id,
                type:typeOfLeave
            }
        )
        await leave.save();
        res.send("Leave request sent")

    } catch (error) {
        res.send(error)
    }
}

const approveLeave = async(req,res)=>{
    const user = req.user;
    if(user.Role === 'HR'){
        const leave = await LeaveSchema.findById(req.body.leave_id);
        leave.status = 'Approved'
        const Availableleves = await AvailableLeaveSchema.findOne({Employee:leave.employee})
        Availableleves[leave.type] = Availableleves[leave.type]- 2;

        await leave.save();
        await Availableleves.save();
        return res.send("Leave Approved")
    }
    return res.send("Not Authorized to perform this task")
}

const rejectLeave = async(req,res)=>{
    const user = req.user;
    if(user.Role === 'HR'){
        const leave = await LeaveSchema.findById(req.body.leave_id);
        leave.status = 'Rejected'
        await leave.save();
        return res.send("Leave Rejected")
    }
    return res.send("Not Authorized to perform this task")

}

module.exports = {
    approveLeave,
    applyleave,
    rejectLeave
}