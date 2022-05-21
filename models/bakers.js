const mongoose = require('mongoose');
const Bread = require('./breads.js');
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
}, { toJSON: { virtuals: true } });

// Virtual
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
});

module.exports = mongoose.model('Baker', bakerSchema);