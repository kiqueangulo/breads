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

baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
});

module.exports = baker;