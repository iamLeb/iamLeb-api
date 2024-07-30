const jwt = require('jsonwebtoken');
const Service = require('../helpers/Service');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const service = new Service();
    let token;

    // Check for token in cookies
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    // Check for token in headers
    if (req.headers && req.headers.authorization) {
        const bearerToken = req.headers.authorization.split(' ');
        if (bearerToken[0] === 'Bearer') {
            token = bearerToken[1];
        }
    }

    // If token is not found in both places, return an error
    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token successfully verified:', decoded);

        // Retrieve the user by id
        req.user = await service.getOne(User, decoded._id);
        console.log('User retrieved:', req.user);

        // Pass control to the next middleware or route handler
        next();
    } catch (e) {
        console.error('Error during token verification or user retrieval:', e);
        if (e.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        if (e.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        // Catch any other errors
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = verifyToken;
