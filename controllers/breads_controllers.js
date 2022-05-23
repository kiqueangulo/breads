const express = require('express');
const Bread = require('../models/breads.js');
const Baker = require('../models/bakers.js');
const breads = express.Router();


// Index
breads.get('/', async (req, res) => {
    const foundBakers = await Baker.find();
    const foundBreads = await Bread.find().limit(5);

    res.render('index', {
        breads: foundBreads,
        bakers: foundBakers,
        title: 'Index Page'
    })
});

// Create
breads.post('/', (req, res) => {
    if (!req.body.image) {
        req.body.image = undefined
    };
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    };

    Bread.create(req.body)
        .then(() => res.redirect('/breads'))
        .catch(err => {   // It's not catching the errors
            console.log(`err ${err}`);
            res.render('404')
        })
});

// New
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
        })
});

// Show
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .populate('baker')
        .then(foundBread => {
            res.render('show', {
                bread: foundBread
            })
        })
        .catch(err => {
          res.render('404')
        })
});

// Update
breads.put('/:id', (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    };

    Bread.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }) 
        .then(updatedBread => res.redirect(`/breads/${req.params.id}`))
        .catch(err => res.render('404'))   // It's not catching the errors
});

// Delete
breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id) 
      .then(deletedBread => { 
        res.status(303).redirect('/breads')
      })
});

// Edit
breads.get('/:id/edit', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            Bread.findById(req.params.id)
                .then(foundedBread => {
                    res.render('edit', { 
                        bread: foundedBread,
                        bakers: foundBakers
                    })
                })
        })
});

module.exports = breads;