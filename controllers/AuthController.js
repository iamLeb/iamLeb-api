const validation = require('../middlewares/validation');
const User = require("../models/User");
const Service = require('../helpers/Service');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const createToken = (_id, res) => {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '30d' }); // Set JWT expiration to 30 days
    // send token to client cookies
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure this is true in production
        sameSite: 'none',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // Set cookie expiration to 30 days
    });
};


const register = async (req, res) => {
    try {
        const service = new Service();
        const { name, email, phone, password } = req.body;
        //validate inputs
        validation.isEmpty(req.body);
        validation.validateEmail(email);
        validation.validatePassword(password)

        // check if email already exist (PK)
        const exist = await service.getByField(User, 'email', email);
        if (exist) return res.status(400).json({error: 'Account already exists'});

        // password encryption
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await service.create(User, { name, email, phone, password: hashedPassword, role: 'admin' });
        if (!user) return res.status(400).json({error: 'There was an error creating Account'});

        return res.status(200).json(user);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

const login = async (req, res) => {
    try {
        const service = new Service();
        const { email, password } = req.body;
        validation.isEmpty(req.body);

        // check if email exist
        const user = await service.getByField(User, 'email', email);
        if (!user) return res.status(401).json({ error: 'Account not found'});

        // check if password matches
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json('Account not found');

        // create and set token
        createToken(user._id, res);

        return res.status(200).json(user);
    } catch (e) {
        // return res.status(400).json({ error: e.message });
    }
}

const checkAuth = (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json('Logged out');
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

module.exports = {
    login,
    register,
    checkAuth,
    logout
}

