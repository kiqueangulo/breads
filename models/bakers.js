const mongoose = require('mongoose');
const { Schema } = mongoose;

const bakerSchema = new Schema({
    name: { 
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: String
});

module.exports = mongoose.model('Baker', bakerSchema);