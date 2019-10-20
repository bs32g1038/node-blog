import axios from 'axios';
import { notification } from 'antd';
import config from '../configs/default.config';

axios.defaults.baseURL = '/api';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
    const { response = {} } = error;
    const errortext = codeMessage[response.status] || response.statusText;
    const { status } = response;
    switch (status) {
        case 401:
            // 返回 401 清除token信息并跳转到登录页面
            localStorage.removeItem(config.tokenKey);
            // history.push('/user/login');
            return Promise.reject(error);
        case 403:
            // 返回 401 清除token信息并跳转到登录页面
            localStorage.removeItem(config.tokenKey);
            // history.push('/user/login');
            return Promise.reject(error);
        default:
            break;
    }
    notification.error({
        message: `请求错误 ${status}`,
        description: errortext,
    });
    return Promise.reject(error);
};

axios.interceptors.request.use(
    function(c) {
        const tokenKey = config.tokenKey;
        const token = localStorage.getItem(tokenKey);
        if (!(c.url && (c.url.includes('getFirstLoginInfo') || c.url.includes('login')))) {
            if (!token) {
                // history.push('/user/login');
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
