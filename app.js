const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
require('dotenv').config();
require('./configs/database');

app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));