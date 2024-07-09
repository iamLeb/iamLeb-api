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
        this.cors = require("cors");
        this.middlewares();
        this.routes();
        this.start();
    }

    middlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(cors({
            origin: ['http://localhost:3000'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }));

        // Error handling middleware
        this.app.use((error, req, res, next) => {
            console.error(error.stack);
            res.status(500).send({ error: error.message });
        });
    }


    routes () {
        this.app.get('/', (req, res) => {
            res.status(200).json('index');
        });

        this.app.use('/auth', require('./routes/auth'));
    }

    start() {
        this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`));
    }
}

new App();