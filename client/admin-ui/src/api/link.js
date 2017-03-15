import axios from 'axios';

export default {
    loadLinks({ page = 1, per_page = 10 }) {
        let url = '/api/admin/links?page=' + page + '&per_page=' + per_page;
        return axios.get(url);
    },
    deleteLink(id) {
        let base_url = '/api/admin/links/' + id;
        return axios.delete(base_url);
    },
    saveLink(id, data) {
        let url = '/api/admin/links';
        if (id) {
            url += '/' + id;
            return axios.put(url, data);
        }
        return axios.post(url, data);
    }
}