const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
require("./configs/database");

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
            origin: [process.env.VITE_CORS],
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

        // error handler
        this.app.use((err, req, res, next) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            return res.status(err.statusCode).json({ error: err.message });
        });
    }

    start() {
        this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`));
    }
}

new App();
