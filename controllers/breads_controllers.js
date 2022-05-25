const express = require('express');
const Bread = require('../models/breads.js');
const Baker = require('../models/bakers.js');
const breads = express.Router();


// Index
breads.get('/', async (req, res) => {
    try {
        const foundBakers = await Baker.find().lean();
        const foundBreads = await Bread.find().limit(10).lean();
    
        res.render('index', {
            breads: foundBreads,
            bakers: foundBakers,
            title: 'Index Page'
        })
    } catch (error) {
        res.render('404')
    }
});

// Create
breads.post('/', async (req, res) => {
    if (!req.body.image) {
        req.body.image = undefined
    };

    req.body.hasGluten = req.body.hasGluten === 'on' ? true : false;

    try {
        await Bread.create(req.body);
        res.redirect('/breads')
    } catch (error) {
        console.log(`err ${error}`);
        res.render('404')
    }
});

// New
breads.get('/new', async (req, res) => {
    try {
        const foundBakers = await Baker.find();
        res.render('new', { bakers: foundBakers })
    } catch (error) {
        res.status(404).render('404')
    }
});

// Show
breads.get('/:id', async (req, res) => {
    try {
        const foundBread = await Bread.findById(req.params.id).populate('baker');
        res.render('show', { bread: foundBread })
    } catch (error) {
        res.render('404')
    }
});

// Update
breads.put('/:id', async (req, res) => {
    req.body.hasGluten = req.body.hasGluten === 'on' ? true : false;

    try {
        await Bread.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        res.redirect(`/breads/${req.params.id}`)
    } catch (error) {
        res.render('404')
    }
});

// Delete
breads.delete('/:id', async (req, res) => {
    try {
        await Bread.findByIdAndDelete(req.params.id);
        res.status(303).redirect('/breads')
    } catch (error) {
        res.render('404')        
    }
});

// Edit
breads.get('/:id/edit', async (req, res) => {
    try {
        const foundBakers = await Baker.find();
        const foundedBread = await Bread.findById(req.params.id);
        
        res.render('edit', { 
            bread: foundedBread,
            bakers: foundBakers
        })
    } catch (error) {
        res.render('404')
    }
});

module.exports = breads;