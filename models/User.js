const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'contact', 'client'],
        default: 'client',
    },
    password: String,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;