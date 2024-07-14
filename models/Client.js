const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
  services: {
    type: [String], // Array of strings
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Email validation
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
