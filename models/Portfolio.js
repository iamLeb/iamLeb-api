const mongoose = require('mongoose');

const Portfolio = new mongoose.Schema({
    link: {
        type: String,
        required: true,
    },

});