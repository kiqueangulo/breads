const express = require('express');
// const { append } = require('express/lib/response');
const Bread = require('../models/breads');
const breads = express.Router();


// Index
breads.get('/', (req, res) => {
    Bread.find()
        .then(foundBreads => {
            res.render('index', {
                breads: foundBreads,
                title: 'Index Page'
            })
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
    res.render('new')
});

// Show
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            const bakedBy = foundBread.getBakedBy();
            console.log(bakedBy);

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
    Bread.findById(req.params.id)
        .then(foundedBread => {
            res.render('edit', { bread: foundedBread })
        })
});

module.exports = breads;