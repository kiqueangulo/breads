const mongoose = require('mongoose');
const Bread = require('./breads.js');
const bakersSeed = require('./bakers_seed');
const { Schema } = mongoose;

const bakerSchema = new Schema({
    name: { 
        type: String,
        required: true,
        enum: bakersSeed.map(baker => baker.name)
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

// Hooks
bakerSchema.post('findOneAndDelete', async function() { 
    await Bread.deleteMany({ baker: this._conditions._id })
});

module.exports = mongoose.model('Baker', bakerSchema);