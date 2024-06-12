import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { API_COMMENT_POST_RATE_LIMIT, API_REQUEST_RATE_LIMIT } from '../configs/index.config';

const limitCommentPost = rateLimit({
    windowMs: API_COMMENT_POST_RATE_LIMIT.windowMs,
    max: API_COMMENT_POST_RATE_LIMIT.max,
});

const limitApiRequest = rateLimit({ windowMs: API_REQUEST_RATE_LIMIT.windowMs, max: API_REQUEST_RATE_LIMIT.max });

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.originalUrl.includes('/api/comments') && req.method === 'POST') {
            return limitCommentPost(req, res, next);
        } else if (req.originalUrl.includes('/api')) {
            return limitApiRequest(req, res, next);
        }
        next();
    }
}
