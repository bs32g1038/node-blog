import jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from '../configs/index.config';
import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
export const auth = (req: Request) => {
    // eslint-disable-next-line no-prototype-builtins
    if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
        try {
            return jwt.verify((req.headers as any).authorization, TOKEN_SECRET_KEY);
        } catch (err) {
            throw new UnauthorizedException('尚未登录！！', err.message);
        }
    }
    return null;
};
