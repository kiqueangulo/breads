const express = require('express');
const { append } = require('express/lib/response');
const breads = express.Router();
const Bread = require('../models/breads.js');

// Index
breads.get('/', (req, res) => {
    res.render('Index', 
        {
            breads: Bread,
            title: 'Index Page'
        }
    )
});

// Show
breads.get('/:arrayIndex', (req, res) => {
    res.send(Bread[req.params.arrayIndex])
});

module.exports = breads;