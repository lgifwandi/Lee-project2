// =======================
//     DEPENDENCIES
// =======================

// -- config
require('dotenv').config();

// -- packages
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');


// =======================
//     MIDDLEWARE
// =======================

// Body parser middleware: give us acces to req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// static files
app.use(express.static('public'))

// =======================
//    CONTROLLERS
// =======================
const menuController = require('./controllers/menu');
app.use('/menu', menuController);

// =======================
//     DATABASE
// =======================

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// =======================
//       LISTENER
// =======================
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`This server works on port: ${PORT}`)
});