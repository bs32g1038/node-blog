import { md5 } from '@blog/client/libs/crypto-js';

export default {
    tokenKey: md5('node-blog-admin-token.com'),
    userInfoKey: md5('node-blog-admin-userInfo'),
};
