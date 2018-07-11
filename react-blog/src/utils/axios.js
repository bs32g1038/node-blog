import axios from 'axios';
let baseUrl = '';
if (typeof window != 'undefined') {
    baseUrl = '/api';
    // 正式环境下的域名
    if (location.hostname == 'www.lizc.me') {
        baseUrl = 'http://www.lizc.me/api';
    }
} else {
    baseUrl = 'http://127.0.0.1:8080/api';
}

const instance = axios.create({
    baseURL: baseUrl
});
instance.defaults.timeout = 3000;
export default instance;