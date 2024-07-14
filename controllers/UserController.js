const validation = require('../middlewares/validation');
const User = require('../models/User');
const Service = require('../helpers/Service');

const create = async (req, res) => {
    try {
        const service = new Service();
        const { name, email, phone, role = 'client' } = req.body;

        // check if email already exist
        const exist = await service.getByField(User, 'email', email);
        if (exist) return res.status(400).json({error: 'Email already exists'});

        const user = await service.create(User, { name, email, phone, role });
        return res.status(200).json(user);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const read = async (req, res) => {
    try {
        const service = new Service();
        const users = await service.get(User);
        return res.status(200).json(users);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const readOne = async (req, res) => {
    try {
        const id = req.params.id;
        const service = new Service();
        const user = await service.getOne(User, id);
        return res.status(200).json(user);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        validation.isEmpty(req.body);
        validation.validateEmail(req.body.email);

        const service = new Service();
        const user = await service.update(User, id, req.body);
        return res.status(200).json(user);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const service = new Service();
        await service.delete(User, id);
        return res.status(200).json("Deleted");
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

module.exports = {
    create,
    read,
    readOne,
    update,
    destroy
};
