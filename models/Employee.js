const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

const EmployeeSchema = new mongoose.Schema({
  EmployeeID: {
    type: Number,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    minlength: [6, "Please provide a password with min length : 6 "],
    required: true,
  },

  Company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
    required: true,
  },

  Department: {
    type: mongoose.Schema.ObjectId,
    ref: "Department",
  },

  Role: {
    type: String,
    required: true,
  },

  Manager: {
    type: mongoose.Schema.ObjectId,
    ref: "Employee",
    default: null,
  },

  Name: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
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
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  Phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\+?[0-9]{7,15}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  Address: {
    type: String,
    required: true,
  },
  
});

EmployeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

EmployeeSchema.methods.generateJwtFromUser = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

  payload = {
    id: this._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });

  return token;
};

module.exports = mongoose.model("Employee", EmployeeSchema);
