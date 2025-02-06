const date = require('date-and-time');
const AttendanceSchema =require('../models/Attandence')


const markAttandance = async(req,res)=>{

    try {
        const today = new Date()
        const formattedDate = date.format(today, 'YYYY-MM-DD');
        const attendance =await AttendanceSchema.findOne({employeeId:req.body.EmployeeID , date:formattedDate});
        if(!attendance){
            
            const newentry = new AttendanceSchema({
                employeeId:req.body.EmployeeID,
                date:formattedDate,
                checkIn:new Date(),
                status:'Present'
            })
            await newentry.save();
            return res.send("check-In successfull")
        }
        const checkOutTime = new Date();
        attendance.checkOut = checkOutTime
        const duration = (checkOutTime - attendance.checkIn) / (1000 * 60 * 60); 
        attendance.workHours = Math.round(duration * 100) / 100;

        // we have to write custom logic hehehehehehehehehe.................
        attendance.status = 'Present';
        await attendance.save();
        return res.send("check out succesful");
    } catch (error) {
        res.send(error.message)
    }
}

const fetechReport = async(req,res)=>{
    const {employeeId} =  req.params
    const {startDate,endDate} = req.query
    const report= await AttendanceSchema.find({
        employeeId,
        date: { $gte: startDate, $lte: endDate },
    });
    res.send(report)
}

module.exports = {
    markAttandance,fetechReport
}