const validation = require('../middlewares/Validation');
const Contact = require('../models/Contact');
const Service = require('../helpers/Service');
const User = require("../models/User");
const { getUser } = require('../controllers/GlobalController');
const create = async (req, res) => {
    try {
        const service = new Service();
        validation.isEmpty(req.body);
        validation.validateEmail(req.body.email);

        const { name, email, phone, role = 'contact', message } = req.body;
        console.log(req.body);

        // Find existing user or contact by email
        let user = await service.getByField(User, 'email', email);
        let contact;

        if (user) {
            // If user exists, create contact message with user id
            contact = await service.create(Contact, { userId: user._id, message });
        } else {
            // If user does not exist, create new user and then contact message
            user = await service.create(User, { name, email, phone, role });
            contact = await service.create(Contact, { userId: user._id, message });
        }

        return res.status(200).json(contact);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};


const read = async (req, res) => {
    try {
        // Call the getUser function passing Service, User, and Contact
    

        const combinedData = await getUser(Service, User, Contact);

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
        const contact = await service.getOne(Contact, id);
        return res.status(200).json(contact);
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
        const contact = await service.update(Contact, id, req.body);
        return res.status(200).json(contact);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const service = new Service();
        await service.delete(Contact, id);
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
