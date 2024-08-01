const jwt = require('jsonwebtoken');
const Service = require('../helpers/Service');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const service = new Service();
    const token = req.cookies.token;
    if (!token) return res.status(401).json({error: 'Token not found'});
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({error: 'Token not verified'});

    // if token is verified, pass user to req
    req.user = await service.getOne(User, decoded._id);
    next();
}

module.exports = verifyToken;