const create = async (req, res) => {
    try {
        return res.status(200).json('creating portfolio');
    } catch (e) {
        res.status(500).send({error: e.message});
    }
}

const read = async (req, res) => {

}

const readOne = async (req, res) => {

}

const update = async (req, res) => {

}

const destroy = async (req, res) => {

}

module.exports = {
    create,
    read,
    readOne,
    update,
    destroy
}