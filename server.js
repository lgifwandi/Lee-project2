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


//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// =======================
//    CONTROLLERS
// =======================
const menuController = require('./controllers/menu');
app.use('/menu', menuController);

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
);



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