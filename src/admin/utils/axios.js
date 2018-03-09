import axios from 'axios';
const instance = axios.create({
    baseURL: '/admin/api'
});
export default instance;