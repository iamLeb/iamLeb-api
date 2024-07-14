const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const ContactSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true,
    }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;