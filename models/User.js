const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'staff'],
        default: 'staff',
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;