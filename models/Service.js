const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: String,
    short: String,
    overview: String,
    offers: [String],
    whyChooseUs: [String],
    getStarted: String
}, { timestamps: true });

const Service = mongoose.model('User', ServiceSchema);

module.exports = Service;