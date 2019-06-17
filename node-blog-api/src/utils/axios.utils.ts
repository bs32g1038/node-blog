import axios from 'axios';
import { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    timeout: 5000
});

export default instance;
