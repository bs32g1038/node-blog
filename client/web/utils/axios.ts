import axios from 'axios';
import Cookies from 'js-cookie';

let baseUrl = '';
if (typeof window !== 'undefined') {
    baseUrl = '';
} else {
    baseUrl = 'http://127.0.0.1:8080';
}

const instance = axios.create({
    baseURL: baseUrl,
});

instance.defaults.timeout = 5000;

instance.interceptors.request.use(
    function (c: any) {
        const userS = Cookies.get('user');
        if (userS) {
            const user = JSON.parse(userS);
            c.headers.authorization = user?.token || '';
        }
        return c;
    },
    function (error) {
        return Promise.reject(error);
    }
);

/**
 * 配置request请求时的默认参数
 */

export default instance;
