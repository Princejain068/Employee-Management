const mongoose = require('mongoose');

const AssetAssignmentSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    comapanyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    assetName: {
        type: String,
        required: true
    },
    assetTag: {
        type: String,
        required: true,
        unique: true
    },
    assetSpecification: {
        type: Object,
        required: true
    },
    assignedDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Assigned', 'Returned', 'Lost', 'Damaged'],
        default: 'Assigned'
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('AssetAssignment', AssetAssignmentSchema);
