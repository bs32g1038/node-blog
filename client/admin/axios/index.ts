import axios from 'axios';
import { message } from 'antd';
import Router from 'next/router';
import config from '@blog/client/configs/admin.default.config';

axios.defaults.baseURL = '/api';

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
    const { response = {}, code, message: msg } = error;
    if (code === 'ECONNABORTED' || msg.includes('timeout')) {
        message.error('网络超时');
        return Promise.resolve(error);
    }
    const { status } = response;
    switch (status) {
        case 401:
            // 返回 401 清除token信息并跳转到登录页面
            localStorage.removeItem(config.tokenKey);
            Router.push('/admin/login');
            return Promise.resolve(error);
        case 403:
            // 返回 401 清除token信息并跳转到登录页面
            localStorage.removeItem(config.tokenKey);
            Router.push('/admin/login');
            return Promise.resolve(error);
        default:
            break;
    }
    if (response.data) {
        message.error(response.data.message);
    }
    return Promise.reject(error);
};

axios.interceptors.request.use(
    function (c: any) {
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
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return errorHandler(error);
    }
);

export default axios;
