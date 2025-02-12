const date = require('date-and-time');
const AttendanceSchema =require('../models/Attandence')
const EmployeeSchema =require('../models/Employee')

const cron = require('node-cron');

const task =cron.schedule('59 23 * * *', async () => {
    const today = new Date()
    const formattedDate = date.format(today, 'YYYY-MM-DD');
    today.setHours(17, 0, 0, 0); 
    
    const attendance =await AttendanceSchema.updateMany({date:formattedDate,status:'Partial'},{$set:{
        status:'Auto Logout',
        checkOut : today,
        workHours : 4
    }});
    
});
task.start();

const markAttandance = async(req,res,next)=>{
    try {
        const user= req.user;
        const today = new Date()
        const formattedDate = date.format(today, 'YYYY-MM-DD');
        const attendance =await AttendanceSchema.findOne({employeeId:user._id , date:formattedDate});
        if(!attendance){
            
            const newentry = new AttendanceSchema({
                employeeId:user._id,
                date:formattedDate,
                checkIn:new Date(),
                status:'Partial'
            })
            await newentry.save();
            return res.send("check-In successfull")
        }
        if(attendance.checkOut)return res.send("You are already checkout")
        const checkOutTime = new Date();
        attendance.checkOut = checkOutTime
        const duration = (checkOutTime - attendance.checkIn) / (1000 * 60 * 60); 
        attendance.workHours = Math.round(duration * 100) / 100;
        if(workHours>=8)
        attendance.status = 'Present';
        else if(workHours>=4 )
        attendance.status = 'Half';
        
        await attendance.save();
        return res.send("check out succesful");
    } catch (error) {
        res.send(error.message)
    }
}

const fetechReport = async(req,res)=>{
    const user = req.user;
    if(user.Role==='HR'){
        id = report.body.employeeid;
        const employee = EmployeeSchema.find({
            id,Company:user.Company
        })
        if(!employee)return res.send("No such employee exist")
        const {startDate,endDate} = req.query
        const report= await AttendanceSchema.find({
            id,
            date: { $gte: startDate, $lte: endDate },
        });
        res.send(report)
    }
    const employeeId =  user._id
    
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