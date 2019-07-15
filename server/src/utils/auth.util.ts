import jwt = require('jsonwebtoken');
import { TOKEN_SECRET_KEY } from '../configs/index.config';
import { UnauthorizedException } from '@nestjs/common';

export const auth = req => {
    if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
        try {
            return jwt.verify(req.headers.authorization, TOKEN_SECRET_KEY);
        } catch (err) {
            throw new UnauthorizedException('尚未登录！！', err.message);
        }
    }
    return null;
};
