import axios from 'axios';
import { AxiosInstance } from 'axios';
import { RequestTimeoutException } from '@nestjs/common';

const instance: AxiosInstance = axios.create({
    timeout: 10000
});

instance.interceptors.response.use(config => {
    return config;
}, error => {
    throw new RequestTimeoutException('请求超时！');
});

export default instance;
