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
  },
  message: {
    type: String,
  }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
