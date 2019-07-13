import axios from 'axios';
let baseUrl = '';
if (typeof window !== 'undefined') {
    baseUrl = '/api';
} else {
    baseUrl = 'http://127.0.0.1:3000/api';
    if (process.env.NODE_ENV === 'production') {
        baseUrl = 'http://127.0.0.1/api';
    }
}
const instance = axios.create({
    baseURL: baseUrl
});
instance.defaults.timeout = 5000;
export default instance;