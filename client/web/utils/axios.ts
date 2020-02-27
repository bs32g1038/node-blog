import axios from 'axios';

let baseUrl = '';
if (typeof window !== 'undefined') {
    baseUrl = '/api';
} else {
    baseUrl = 'http://127.0.0.1:8080/api';
}

const instance = axios.create({
    baseURL: baseUrl,
});

instance.defaults.timeout = 5000;

/**
 * 配置request请求时的默认参数
 */

export default instance;
