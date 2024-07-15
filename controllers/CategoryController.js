const validation = require('../middlewares/validation');
const Category = require('../models/Category');
const Service = require('../helpers/Service');


const create = async (req, res) => {
    try {
        const service = new Service();
        console.log(req.body);


        const { name, short, overview, services, why, proceed } = req.body;

        
        // check if category already exist
        const exist = await service.getByField(Category, 'name', name);
        if (exist) return res.status(400).json({ error: 'Category already exist'});

        // create category
        const category = await service.create(Category, req.body);

        return res.status(200).json(category);
    } catch (e) {
        console.error("Error in create Category:", e); // Log the error
        return res.status(400).json({ error: e.message });
    }
};


const read = async (req, res) => {
    try {
        const service = new Service();
        const categories = await service.get(Category);
        // Return the data as JSON response
        return res.status(200).json(categories);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const readOne = async (req, res) => {
    try {
        const id = req.params.id;
        const service = new Service();
        const category = await service.getOne(Category, id);
        return res.status(200).json(category);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;

        const service = new Service();
        const category = await service.update(Category, id, req.body);
        return res.status(200).json(category);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const service = new Service();
        await service.delete(Category, id);
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
