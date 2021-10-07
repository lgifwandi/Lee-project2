const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: String,
    ingredient: String,
    img: String,
    price: Number,
});

const menu = mongoose.model('menu', menuSchema);

module.exports = menu;