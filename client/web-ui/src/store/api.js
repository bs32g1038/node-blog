import config from '../config.js';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1/api'

export default {

    fetchData(url) {
        return axios.get(url).then(res => res.data)
            .then(data => data)
            .catch(e => console.log("uh error", e))
    },
    loadArticle(id) {
        let url = '/articles/' + id;
        return this.fetchData(url);
    },
    loadArticleList({ category = 'all', page = 1, per_page = 10 }) {
        let filter = '?category=' + category + '&page=' + page + '&per_page=' + per_page;
        let url = '/articles' + filter;
        return this.fetchData(encodeURI(url));
    },
    loadInitData() {
        return this.fetchData('/init');
    },
    loadGuestbookList({ page = 1, per_page = 10 }) {
        let url = '/guestbooks' + '?page=' + page + '&per_page=' + per_page;
        return this.fetchData(url);
    },
    loadSearchList({ key = '', page = 1, per_page = 10 }) {
        let url = encodeURI("/search?key=" + key + '&page=' + page + '&per_page=' + per_page);
        return this.fetchData(url);
    },
    loadAbout() {
        return this.fetchData('/abouts/admin');
    }
}