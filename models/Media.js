const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const MediaSchema = new mongoose.Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        enum: ['image', 'video'],
        default: 'image',
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

const Media = mongoose.model('Media', MediaSchema);

module.exports = Media;