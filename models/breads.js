// require mongoose 
const mongoose = require('mongoose');
// creating shorthand for the Schema constructor 
const { Schema } = mongoose;

// Schema
const breadSchema = new Schema({
    name: { type: String, required: true },
    hasGluten: Boolean,
    image: { type: String, default: 'http://placekitten.com/400/400' },
    baker: {
        type: String,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    }
});

// helper methods 
breadSchema.methods.getBakedBy = function(){
    return `${this.name} was baked with love by ${this.baker}`
};

// Model and export
const Bread = mongoose.model('Bread', breadSchema);
module.exports = Bread;