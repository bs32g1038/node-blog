import axios from 'axios';

export default {
    fetchData(url) {
        return axios.get(url).then(res => res.data)
            .then(data => data)
            .catch(e => console.log("uh error", e))
    },
    loadComments({ page = 1, per_page = 10 }) {
        let url = '/api/admin/comments?page=' + page + '&per_page=' + per_page;
        return this.fetchData(url);
    },
    deleteComment(id) {
        let base_url = '/api/admin/comments/' + id;
        return axios.delete(base_url);
    },
    saveComment(data) {
        let base_url = '/api/admin/comments?admin=true';
        return axios.post(base_url, data)
    },
    handlePass(id, pass) {
        let base_url = '/api/admin/comments/' + id + '/pass';
        return axios.put(base_url, { pass: pass })
    }
}