const express = require('express');
const { model } = require('mongoose');
const baker = express.Router();
const Baker = require('../models/bakers.js');
const bakerSeedData = require('../models/bakers_seed.js');

baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
});

module.exports = baker;