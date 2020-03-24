import axios from 'axios';
import { AxiosInstance } from 'axios';
import { RequestTimeoutException } from '@nestjs/common';

const instance: AxiosInstance = axios.create({
    timeout: 5000,
});

instance.interceptors.response.use(
    (config) => {
        return config;
    },
    () => {
        throw new RequestTimeoutException('请求超时！');
    }
);

export default instance;
