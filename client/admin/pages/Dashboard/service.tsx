import axios from '@blog/client/admin/axios';

export async function getStatisticalInfo() {
    return axios.get('/dashboard/statistical-info');
}

export async function getUserLoginInfo() {
    return axios.get('/user/login-info');
}

export async function getSystemInfo() {
    return axios.get('/dashboard/system-info');
}

export async function getRecentComments() {
    return axios.get('/recent-comments');
}

export async function getRecentAdminLogs() {
    return axios.get('/recent-admin-logs');
}
