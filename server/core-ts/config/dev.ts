/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-15 21:36:48 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-26 15:10:48
 */

export default {
    debug: true,
    hostname: 'localhost',
    port: 8080,
    redis: {
        host: '127.0.0.1',
        port: 6379
    },
    db: { // 数据库配置
        uri: 'mongodb://localhost:27017/test',
        options: {
            user: '',
            pass: ''
        }
    },
    admin_role: {
        account: 'admin',
        password: 'admin'
    },
    session_secret: 'test_secret' // 务必修改
}