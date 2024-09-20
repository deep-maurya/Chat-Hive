const jwt = require('jsonwebtoken');
require("dotenv").config();

const create_token = (payload, time = '5m') => {
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: time });
};

const verify_token = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return { status: true, decode: decoded };
    } catch (error) {
        return { status: false, decode: null };
    }
};

module.exports = { create_token, verify_token };
