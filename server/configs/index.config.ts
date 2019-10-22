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

export const TOKEN_SECRET_KEY = 'NODEBLOG/bs32g1038@163.com/TOKEN';

export const GITHUB_SECRET_KEY = 'Github/bs32g1038@163.com/TOKEN';

export const ADMIN_USER_INFO = {
    nickName: '冷夜流星',
    email: 'bs32g1038@163.com',
    location: '广东 广州',
};

export const RSS = {
    title: '李志成的个人网站',
    link: 'http://www.lizc.net',
    language: 'zh-cn',
    description: '博客小站，专注于web开发，尤其是前端开发。喜欢和同道中人一起搞开发！',
    maxRssItems: 50,
};
