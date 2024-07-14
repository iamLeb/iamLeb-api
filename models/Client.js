const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
},
  services: {
    type: [String], // Array of strings
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
