import axios from 'axios';
axios.defaults.baseURL = '/api';
axios.interceptors.request.use(function(config) {
    const token = sessionStorage.getItem("node-blog-bs32g1038");
    config.headers.authorization = token || '';
    return config;
}, function(error) {
    return Promise.reject(error);
});
export default axios;