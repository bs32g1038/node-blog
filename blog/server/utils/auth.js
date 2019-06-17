const jwt = require('jsonwebtoken');
const config = require('../config');
function auth(req) {
    if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
        try {
            return jwt.verify(req.headers['authorization'], config.token_secret_key);
        } catch (err) {
            return null
        }
    }
    return null
}
module.exports = auth;