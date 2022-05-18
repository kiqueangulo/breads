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

    Bread.create(req.body);
    res.redirect('/breads'); // It takes the user back the index page
});

// New
breads.get('/new', (req, res) => {
    res.render('new')
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
          res.render('404')
        })
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

// Delete
breads.delete('/:indexArray', (req, res) => {
    Bread.splice(req.params.indexArray, 1);
    res.status(303).redirect('/breads');
});

// Edit
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
        bread: Bread[req.params.indexArray],
        index: req.params.indexArray
    })
});

module.exports = breads;