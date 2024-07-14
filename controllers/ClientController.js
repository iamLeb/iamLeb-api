const validation = require('../middlewares/validation');
const Client = require('../models/Client');
const Service = require('../helpers/Service');

const create = async (req, res) => {
    try {
        validation.isEmpty(req.body);
        validation.validateEmail(req.body.email);

        const service = new Service();
        const client = await service.create(Client, req.body);

        return res.status(201).json(client);

    } catch (e) {
        return res.status(400).send({error: e.message })
    }
}
const read = async (req, res) => {
    try {
        const service = new Service();
        const clients = await service.get(Client);
        return res.status(200).json(clients);
    } catch (e) {
        return res.status(400).send({error: e.message})
    }
}
const readOne = async (req, res) => {
    try {
        const id = req.params.id;
        const service = new Service();
        const client = await service.getOne(Client, id);
        return res.status(200).json(client);
    } catch (e) {
        return res.status(400).send({error: e.message})
    }
}
const update = async (req, res) => {
    try {
        const id = req.params.id;
        validation.isEmpty(req.body);
        validation.validateEmail(req.body.email);

        const service = new Service();
        const client = await service.update(Client, id, req.body);
        return res.status(200).json(client);
    } catch (e) {
        return res.status(400).send({error: e.message})
    }
}
const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const service = new Service();
        await service.delete(Client, id);
        return res.status(200).json("Deleted");
    } catch (e) {
        return res.status(400).json({error: e.message})
    }
}

module.exports = {
    create,
    read,
    readOne,
    update,
    destroy
}