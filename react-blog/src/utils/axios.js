import axios from 'axios';
const instance = axios.create({
    baseURL: typeof window !== 'undefined' ? '/api' : 'http://127.0.0.1:8080/api'
});
instance.defaults.timeout = 3000;
export default instance;