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
    if (Bread[req.params.arrayIndex]) {
        res.render('Show', {
            bread: Bread[req.params.arrayIndex]
        })
    } else {
        res.render('404')
    };
});

// Create
breads.post('/', (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    };

    Bread.push(req.body);
    res.send(Bread); // To see the data updated
});

module.exports = breads;