const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
    start_date:{
        type: String,
        required : true
    },
    end_date:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ['Recieved', 'Approved', 'Rejected'],
        required: true,

    },
    leaveReason:{
        type: String
    }
    ,
    employee: {
    type: mongoose.Schema.ObjectId,
    ref: "Employee",
    required: true,
    },
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Leave", LeaveSchema);;
