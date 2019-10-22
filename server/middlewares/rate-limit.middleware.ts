import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { auth } from '../utils/auth.util';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.originalUrl.includes('/api/comments') && req.method === 'POST' && !auth(req)) {
            return rateLimit({ windowMs: 12 * 60 * 1000, max: 100 })(req, res, next);
        } else if (req.originalUrl.includes('/api')) {
            return rateLimit({ windowMs: 3 * 60 * 1000, max: 1000 })(req, res, next);
        }
        next();
    }
}
