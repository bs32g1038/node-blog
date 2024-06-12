import axios from 'axios';
import { message } from 'antd';
import Router from 'next/router';
import Cookies from 'js-cookie';

axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

/**
 * 异常处理程序
 */
const errorHandler = (error: { response?: Record<any, any> | undefined; code: any; message: any }) => {
    const { response = {}, code, message: msg } = error;
    if (code === 'ECONNABORTED' || msg.includes('timeout')) {
        message.error('网络超时');
        return Promise.resolve(error);
    }
    const { status } = response;
    switch (status) {
        case 401:
            // 返回 401 清除token信息并跳转到登录页面
            Cookies.remove('mstoken');
            Router.push('/admin/login');
            message.error(response.data.message);
            return Promise.reject(error);
        case 403:
            // 返回 401 清除token信息并跳转到登录页面
            Cookies.remove('mstoken');
            Router.push('/admin/login');
            return Promise.reject(error);
        default:
            break;
    }
    if (response.data) {
        message.error(response.data.message);
    }
    return Promise.reject(error);
};

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return errorHandler(error);
    }
);

export default axios;
