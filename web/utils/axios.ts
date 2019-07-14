import axios from 'axios';
let baseUrl = '';
if (typeof window !== 'undefined') {
    baseUrl = '/api';
} else {
    baseUrl = 'http://127.0.0.1:3000/api';
}
const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000/api'
});
instance.defaults.timeout = 5000;
export default instance;