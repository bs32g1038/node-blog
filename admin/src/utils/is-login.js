import axios from '../axios';

export const isLogin = async () => {
    return axios.get('/is-login').then(res => res.data.isLogin);
};
