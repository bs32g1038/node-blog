import axios from '../../axios';

export async function getStatisticalInfo() {
    return axios.get('/dashboard/statistical-info');
}

export async function getUserLoginInfo() {
    return axios.get('/user/login-info');
}

export async function getSystemInfo() {
    return axios.get('/dashboard/system-info');
}
