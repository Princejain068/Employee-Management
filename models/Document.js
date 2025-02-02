const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  documentId: {
    type: Number,
    required: true,
    unique: true, 
  },
  title: {
    type: String,
    required: true,
    trim: true, 
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  documentType: {
    type: String,
    required: true,
    enum: ["Policy", "Report", "Contract", "Manual", "Other"], 
  },
  creationDate: {
    type: Date,
    default: Date.now, 
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", 
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", 
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", 
    required: true,
  },
}, { 
  timestamps: true
});


module.exports= mongoose.model("Document", DocumentSchema);


