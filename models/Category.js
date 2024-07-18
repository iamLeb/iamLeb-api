const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    short: String,
    overview: String,
    services: [String],
    why: [String],
    proceed: String,

}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;