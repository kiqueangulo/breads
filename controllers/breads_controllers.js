const express = require('express');
const breads = express.Router();
const Bread = require('../models/breads.js');

// Index
breads.get('/:arrayIndex', (req, res) => {
    res.send(Bread[req.params.arrayIndex]);
});

module.exports = breads;