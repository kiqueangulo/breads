// Dependencies
const express = require('express');

// Configuration
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

// Middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res. send('Welcome to an Awesome App about Braeds!');
});

// Breads
const breadsControllers = require('./controllers/breads_controllers.js');
app.use('/breads', breadsControllers);

// Wild card
app.get('*', (req, res) => {
    res.send('404')
});

// Listen
app.listen(PORT, () => {
    console.log('noming at port', PORT);
});