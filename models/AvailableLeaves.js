const mongoose = require('mongoose');

const AvailableLeaveSchema = new mongoose.Schema({
    Employee:{
        type : mongoose.Schema.ObjectId,
        ref : 'Employee'
    },
   
    Casual:{
        type: Number,
        default:0
    },
    Sick:{
        type: Number,
        default:0
    },
    Maternity:{
        type: Number,
        default:0
    },
    Paternity:{
        type: Number,
        default:0
    },
    Privilege:{
        type: Number,
        default:0
    },
    Bereavement:{
        type: Number,
        default:0
    },
    Compensatory:{
        type: Number,
        default:0
    },
    Unpaid:{
        type: Number,
        default:0
    },
    

})

module.exports = mongoose.model("Leaves", AvailableLeaveSchema);