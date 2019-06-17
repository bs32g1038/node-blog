import jwt = require('jsonwebtoken');
import config from '../configs/index.config';

export const auth = (req) => {
    if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
        try {
            return jwt.verify(req.headers.authorization, config.token_secret_key);
        } catch (err) {
            return null;
        }
    }
    return null;
};
