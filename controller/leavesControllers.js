const LeaveSchema = require('../models/Leaves')
const EmployeeSchema = require('../models/Employee')


const applyleave = async(req,res)=>{
    try {
        const {start_date , end_date ,employeeID,leaveReason} = req.body
        const employee = await EmployeeSchema.findById(employeeID);
        const leave = new LeaveSchema(
            {
                start_date,
                end_date,
                leaveReason,
                employe:employeeID,
                status:'Recieved',
                employee:employee._id
            }
        )
   
        
        await leave.save();
        res.send("Leave request sent")

    } catch (error) {
        res.send(error.message)
    }
}

const approveLeave = async(req,res)=>{
    const leave = await LeaveSchema.findById(req.body.leave_id);
    const employee =await EmployeeSchema.findById(leave.employee);

    // validation
    leave.status = 'Approved'
    await leave.save();
    employee.Leave = employee.Leave  +1;
    await employee.save();
    res.send("Leave Approved")

}

const rejectLeave = async(req,res)=>{
    const leave = await LeaveSchema.findById(req.body.leave_id);
    leave.status = 'Rejected'
    await leave.save();
    res.send("Leave Rejected")
}

module.exports = {
    approveLeave,
    applyleave,
    rejectLeave
}