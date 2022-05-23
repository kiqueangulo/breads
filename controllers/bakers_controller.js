const express = require('express');
const baker = express.Router();
const Baker = require('../models/bakers.js');
const bakerSeedData = require('../models/bakers_seed.js');

// Index
baker.get('/', (req, res) => {
    Baker.find()
        .populate('breads')
        .then(foundBakers => {
            console.log(foundBakers);
            res.send(foundBakers)
        })
});

// Show
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate('breads')
        .then(foundBaker => {
            res.render('bakers/show', { baker: foundBaker })
        })
});

// Delete
baker.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id)
        .then(deletedBaker => res.status(303).redirect('/breads'))
});

baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
});

module.exports = baker;