// Dependencies
const express = require('express');

// Configuration
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

// Routes
app.get('/', (req, res) => {
    res. send('Welcome to an Awesome App about Braeds!');
});

// Breads
const breadsControllers = require('./controllers/breads_controllers.js');
app.use('/breads', breadsControllers);

// Listen
app.listen(PORT, () => {
    console.log('noming at port', PORT);
});