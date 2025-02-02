const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  departmentId: {
    type: String,
    required:true,
    unique:true
  },
  DepartmentName: {
    type: String,
    required: true,
  },
  Company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true,
  },
  Description: {
    type: String,
  },
  ManagerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee',
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
  }
});

module.exports = mongoose.model('Department', DepartmentSchema);
