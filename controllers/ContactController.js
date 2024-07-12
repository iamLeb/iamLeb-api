const create = (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
            throw Error('All fields is required');
        }
        return res.status(201).json(req.body);
    } catch (e) {
        throw e;
    }
}

module.exports = {
    create
}