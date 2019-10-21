import axios from 'axios';
import { notification } from 'antd';
import Router from 'next/router';
import config from '../configs/default.config';

axios.defaults.baseURL = '/api';

/**
 * 异常处理程序
 */
const errorHandler = error => {
    const { response = {} } = error;
    const { status } = response;
    switch (status) {
        case 401:
            // 返回 401 清除token信息并跳转到登录页面
            localStorage.removeItem(config.tokenKey);
            Router.push('/admin/login');
            return Promise.reject(error);
        case 403:
            // 返回 401 清除token信息并跳转到登录页面
            localStorage.removeItem(config.tokenKey);
            Router.push('/admin/login');
            return Promise.reject(error);
        default:
            break;
    }
    notification.error({
        message: response.data.message,
    });
    return Promise.reject(error);
};

axios.interceptors.request.use(
    function(c) {
        const tokenKey = config.tokenKey;
        const token = localStorage.getItem(tokenKey);
        if (!(c.url && (c.url.includes('getFirstLoginInfo') || c.url.includes('login')))) {
            if (!token) {
                Router.push('/admin/login');
            }
        }
        c.headers.authorization = token || '';
        return c;
    },
    function(error) {
        return Promise.reject(error);
    }
);

/**
 * 配置request请求时的默认参数
 */
axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        return errorHandler(error);
    }
);

export default axios;
