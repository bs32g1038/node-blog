import axios from 'axios';
let baseUrl = '';
if (typeof window != 'undefined') {
    baseUrl = '/api';
} else {
    baseUrl = 'http://127.0.0.1:8080/api';
    // 正式环境下的域名
    if (process.env.NODE_ENV == "production") {
        baseUrl = 'http://www.lizc.me/api';
    }
}

const instance = axios.create({
    baseURL: baseUrl
});
instance.defaults.timeout = 3000;
export default instance;