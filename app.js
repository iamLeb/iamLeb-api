const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
require('./configs/database'); // Assuming this file handles database connection properly

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.middlewares();
        this.routes();
        this.start();
    }

    middlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(cors({
            origin: process.env.VITE_CORS, // Assuming VITE_CORS is a single origin URL
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }));
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.status(200).json('index');
        });

        this.app.use('/auth', require('./routes/auth'));
        this.app.use('/user', require('./routes/user'));
        this.app.use('/contact', require('./routes/contact'));
        this.app.use('/client', require('./routes/client'));
        this.app.use('/category', require('./routes/category'));
        this.app.use('/portfolio', require('./routes/portfolio'));
    }

    start() {
        this.app.listen(this.port, () => console.log(`Server is running on port ${this.port}`));
    }
}

new App();
