const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI)
    .then(res => console.log('Connected successfully!'))
    .catch(err => console.log(err));
