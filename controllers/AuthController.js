const validation = require('../middlewares/validation');
const User = require("../models/User");
const Service = require('../helpers/Service');
const bcrypt = require('bcryptjs');
const service = require("./AuthController");

const createToken = (id) => {

}

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
        if (!user) return res.status(400).json({error: 'Account not found'});

        // check if password matches
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({error: 'Account not found'});



        return res.status(200).json(user);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

module.exports = {
    login,
    register
}

