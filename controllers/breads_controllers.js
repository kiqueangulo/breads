const express = require('express');
const breads = express.Router();
const Bread = require('../models/breads.js');

// Index
breads.get('/', (req, res) => {
    res.render('Index', 
        {
            breads: Bread
        }
    );
    // res.send(Bread[req.params.arrayIndex]);
});

module.exports = breads;