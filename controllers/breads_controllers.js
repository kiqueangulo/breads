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

// New
breads.get('/new', (req, res) => {
    res.render('new')
});

// Update
breads.put('/:arrayIndex', (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    };

    Bread[req.params.arrayIndex] = req.body;
    res.redirect(`/breads/${req.params.arrayIndex}`);
});

// Show
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.render('show', {
                bread: foundBread
            })
        })
        .catch(err => {
          res.send('404')
        })
});

// Edit
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
        bread: Bread[req.params.indexArray],
        index: req.params.indexArray
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

    Bread.create(req.body);
    res.redirect('/breads'); // It takes the user back the index page
});

// Delete
breads.delete('/:indexArray', (req, res) => {
    Bread.splice(req.params.indexArray, 1);
    res.status(303).redirect('/breads');
});

module.exports = breads;