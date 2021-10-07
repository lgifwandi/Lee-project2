// =======================
//     DEPENDENCIES
// =======================
const express = require('express');
const menuRouter = express.Router();
const menu = require('../models/menu');

// =======================
//    SEED
// =======================
const menuSeed = require('../models/menuSeed');
menuRouter.get('/seed', (req, res) => {
    menu.deleteMany({}, (error, allmenu) => {});

    menu.create(menuSeed, (error, data) => {
        res.redirect('/menu');
    });
});
// =======================
//       ROUTES
// =======================

// Index
menuRouter.get('/', (req, res) => {
    menu.find({}, (error, allmenu) => {
        res.render('index.ejs', {
            menu: allmenu,
        });
    });
});

// New
menuRouter.get('/new', (req, res) => {
    res.render('new.ejs');
});

// Delete
menuRouter.delete('/:id', (req, res) => {
    menu.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/menu');
    });
});

// Update
menuRouter.put('/:id', (req, res) => {

    menu.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updatedmenu) => {
        res.redirect(`/menu/${req.params.id}`);
    });
});

// Create
menuRouter.post('/', (req, res) => {

    menu.create(req.body, (error, createdmenu) => {
        res.redirect('/menu');
    });
});

// Edit 
menuRouter.get('/:id/edit', (req, res) => {
    menu.findById(req.params.id, (error, foundmenu) => {
        res.render('edit.ejs', {
            menu: foundmenu
        });
    });
});

// Show
menuRouter.get('/:id', (req, res) => {
    menu.findById(req.params.id, (err, foundmenu) => {
        res.render('show.ejs', {
            menu: foundmenu,
        });
    });
});


module.exports = menuRouter;