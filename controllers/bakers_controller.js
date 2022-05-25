const express = require('express');
const baker = express.Router();
const Baker = require('../models/bakers.js');
const bakerSeedData = require('../models/bakers_seed.js');

// Index (for testing)
baker.get('/', async (req, res) => {
    try {
        const foundBakers = await Baker.find().populate('breads');
        console.log(foundBakers);
        res.send(foundBakers)
    } catch (error) {
        res.render('404')
    }
});

// Show
baker.get('/:id', async (req, res) => {
    try {
        const foundBaker = await Baker
            .findById(req.params.id)
            .populate({ 
                path: 'breads', 
                options: { limit: 5 } 
            });

        res.render('bakers/show', { baker: foundBaker })
    } catch (error) {
        res.render('404')
    }
});

// Delete
baker.delete('/:id', async (req, res) => {
    try {
        await Baker.findByIdAndDelete(req.params.id);
        res.status(303).redirect('/breads')
    } catch (error) {
        res.render('404')
    }
});

baker.get('/data/seed', async (req, res) => {
    await Baker.insertMany(bakerSeedData);
    res.redirect('/breads')
});

module.exports = baker;