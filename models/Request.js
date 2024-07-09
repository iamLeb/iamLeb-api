const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    service: {
        type: [String],
    },
    message: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;