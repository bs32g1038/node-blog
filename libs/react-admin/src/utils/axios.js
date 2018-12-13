import axios from 'axios';
import config from '../config';
import history  from './history';
const tokenKey = config.tokenKey;
axios.defaults.baseURL = '/api';
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem(tokenKey);
    config.headers.authorization = token || '';
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    localStorage.removeItem(config.tokenKey);
                    history.push('/blog/admin/login');
            }
        }
        return Promise.reject(error.response.data);   // 返回接口返回的错误信息
    });
export default axios;