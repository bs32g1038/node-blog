export const environment = process.env.NODE_ENV;
export const isDevMode = Object.is(environment, 'development');
export const isProdMode = Object.is(environment, 'production');
export const isTestMode = Object.is(environment, 'test');

export const APP_SERVER = {
    hostname: 'localhost',
    port: '8080',
    environment,
};

export const MONGODB = {
    uri: isDevMode
        ? 'mongodb://localhost:27017/dev'
        : isTestMode
          ? 'mongodb://localhost:27017/test'
          : process.env.MONGODB_URL ||
            `mongodb://${process.env.MONGODB_HOSTNAME || 'localhost'}:${process.env.MONGODB_PORT || '27017'}/blog`,
    username: process.env.MONGODB_USERNAME || '',
    password: process.env.MONGODB_PASSWORD || '',
};

export const JWT_TOKEN_SECRET_KEY = process.env.JWT_TOKEN_SECRET_KEY || 'jwt-token';

export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY || 'my-secret';

/**
 * 间隔时间 1 个小时 (60 * 60 * 1000毫秒)
 * 每个 ip 最多 30 条
 */
export const API_COMMENT_POST_RATE_LIMIT = {
    windowMs: 60 * 60 * 1000,
    max: 30,
};

/**
 * 间隔时间 1 个小时 (60 * 60 * 1000毫秒)
 * 每个 ip 最多 5000 次请求
 */
export const API_REQUEST_RATE_LIMIT = {
    windowMs: 60 * 60 * 1000,
    max: 5000,
};
