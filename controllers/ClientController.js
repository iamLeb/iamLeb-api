const validation = require('../middlewares/Validation');
const Client = require('../models/Client');
const User = require('../models/User'); // Assuming you have a User model
const Service = require('../helpers/Service');
const { getUser } = require('../controllers/GlobalController');


const create = async (req, res) => {
    try {
        const service = new Service();
        validation.validateEmail(req.body.email);

        const { services, fullName, email, phoneNumber, role = 'client', message } = req.body;

        let user = await service.getByField(User, 'email', email);
        let client;

        if (user) {
            client = await service.create(Client, { userId: user._id, message, services });
        } else {
            user = await service.create(User, { name: fullName, email, phone: phoneNumber, role });
            client = await service.create(Client, { userId: user._id, message, services });
        }

        return res.status(200).json(client);
    } catch (e) {
        console.error("Error in create function:", e); // Log the error
        return res.status(400).json({ error: e.message });
    }
};


const read = async (req, res) => {
    try {
        const combinedData = await getUser(Service, User, Client);

        // Return the combined data as JSON response
        return res.status(200).json(combinedData);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const readOne = async (req, res) => {
    try {
        const id = req.params.id;
        const service = new Service();
        const client = await service.getOne(Client, id);
        return res.status(200).json(client);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        validation.isEmpty(req.body);
        validation.validateEmail(req.body.email);

        const service = new Service();
        const client = await service.update(Client, id, req.body);
        return res.status(200).json(client);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const service = new Service();
        await service.delete(Client, id);
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
