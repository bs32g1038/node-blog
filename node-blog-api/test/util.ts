import config from '../src/configs/index.config';
import jwt = require('jsonwebtoken');

export const getToken = () => {
    return jwt.sign({
        account: 'test',
        roles: ['admin']
    }, config.token_secret_key, {
            expiresIn: 60 * 60
        });
};

export const verifyToken = (str) => {
    return jwt.verify(str, config.token_secret_key);
};
