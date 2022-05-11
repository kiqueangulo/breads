// Dependencies
const express = require('express');
const methodOverride = require('method-override');

// Configuration
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

// Middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.use(methodOverride('_method')); // To override the POST method at show.jsx


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