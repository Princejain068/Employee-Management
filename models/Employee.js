const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  EmployeeID: {
    type: Number,
    required: true,
    unique: true,
  },
  Company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true,
  },
  Department: {
    type: mongoose.Schema.ObjectId,
    ref: 'Department',
  },
  Manager: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee',
    default: null,
  },
  Name: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  DateOfBirth: {
    type: Number,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  Phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\+?[0-9]{7,15}$/.test(v); 
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  Address: {
    type: String,
    required: true,
  },
  Leave: {
    type: Number,
    default:0,
    required: true,
  },
  Balance: {
    type: Number,
    default:0,
    required: true,
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);