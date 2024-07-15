const mongoose = require('mongoose');

// Ensure you have the environment variable set correctly
console.log(process.env.DB_URI); // This is for debugging purposes
console.log("Error from database");

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('Connected successfully!'))
    .catch(err => console.log('Connection error: ', err));
