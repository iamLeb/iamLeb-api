// validation.js

const validator = require('validator');

// Validate empty fields
const isEmpty = (data) => {
    const keys = Object.keys(data);
    for (let key of keys) {
        if (validator.isEmpty(data[key])) {
            throw new Error(`All Fields are required`);
        }
    }
};

// Example validation functions
const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email'); // throw new error
    }
};

const validatePassword = (password) => {
    // Example: Password must be at least 6 characters long
    if (!validator.isLength(password, { min: 6 })) {
        throw new Error('Password must be at least 6 characters long');
    }
};

// Export all validation functions
module.exports = {
    isEmpty,
    validateEmail,
    validatePassword
    // Add more validation functions as needed
};
