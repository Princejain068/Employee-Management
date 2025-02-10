const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  Registration: {
    type: String,
    required: true,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
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
  Website: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/.test(v);
      },
      message: props => `${props.value} is not a valid website URL!`
    }
  },
  Address: {
    type: String,
    required: true,
  },
  Headquarters: {
    type: String,
    required: true,
  },
  Founder: {
    Name: {
      type: String,
      required: true,
    }
  }
});


module.exports = mongoose.model('Company', CompanySchema);