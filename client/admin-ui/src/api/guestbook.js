import axios from 'axios';

export default {
    loadGuestbooks({ page = 1, per_page = 10 }) {
        let url = '/api/admin/guestbooks?page=' + page + '&per_page=' + per_page;
        return axios.get(url);
    },
    deleteGuestbook(id) {
        let base_url = '/api/admin/guestbooks/' + id;
        return axios.delete(base_url);
    },
    updateReplyContent(id, reply) {
        let base_url = '/api/admin/guestbooks/' + id + '/reply_content';
        return axios.put(base_url, { reply_content: reply })
    },
    handlePass(id, pass) {
        let base_url = '/api/admin/guestbooks/' + id + '/pass';
        return axios.put(base_url, { pass: pass })
    }
}