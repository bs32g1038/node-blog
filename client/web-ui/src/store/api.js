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
    loadArticleList({ category = 'all', page = 1 }) {
        let filter = '?category=' + category + '&page=' + page
        let url = '/articles' + filter;
        return this.fetchData(encodeURI(url));
    },
    loadInitData() {
        return this.fetchData('/init');
    },
    // loadGuestbookList({ page }) {
    //     page = page || 1;
    //     let url = this.base_url + "/guestbook/page/" + page;
    //     return this.fetchData(url);
    // },
    // loadSearchList({ key, page }) {
    //     page = page || 1;
    //     key = key || '';
    //     let url = encodeURI(this.base_url + "/post/search?" + 'key=' + key + '&page=' + page);
    //     return this.fetchData(url);
    // },
    // loadAbout() {
    //     let url = this.base_url + "/about";
    //     return this.fetchData(url);
    // }
}