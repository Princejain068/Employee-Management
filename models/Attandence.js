const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.ObjectId,
    ref: "Employee", 
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date,
    required: false, 
  },
  checkOut: {
    type: Date,
    required: false, 
  },
  workHours: {
    type: Number,
    required: false, 
    default: 0,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "Partial","Auto Logout","Half"],
  },
  notes: {
    type: String,
    required: false,
  },
}, { 
  timestamps: true 
});




module.exports = mongoose.model("Attendance", AttendanceSchema);;
