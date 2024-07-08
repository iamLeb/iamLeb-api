const login = async (req, res) => {
    return res.json('Welcome to Login')
}

const register = async (req, res) => {
    return res.json('Welcome to Register')
}

module.exports = {
    login,
    register
}