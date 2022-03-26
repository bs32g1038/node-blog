import { md5 } from '@blog/client/libs/crypto-js';

const config = {
    tokenKey: md5('node-blog-admin-token.com'),
    userInfoKey: md5('node-blog-admin-userInfo'),
};

export default config;
