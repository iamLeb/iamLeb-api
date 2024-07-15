const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
require("./configs/database");
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const contactRoute = require('./routes/contact')
const clientRoute = require('./routes/client')
const categoryRoute = require('./routes/category')

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        // this.cors = require("cors");
        // this.middlewares();
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

    routes () {
        this.app.get('/', (req, res) => {
            res.status(200).json('index');
        });

        this.app.use('/auth', authRoute);
        this.app.use('/user', userRoute);
        this.app.use('/contact', contactRoute);
        this.app.use('/client', clientRoute);
        this.app.use('/category', categoryRoute);

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