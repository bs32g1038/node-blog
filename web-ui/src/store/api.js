import config from '../config.js';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1/api'

export default {

    fetchData(url) {
        return axios.get(url).then(res => res.data)
            .then(data => data)
            .catch(e => console.log("uh error", e))
    },
    // loadPost(id) {
    //     let url = this.base_url + "/post/" + id;
    //     return this.fetchData(url);
    // },
    loadPostList({ category, page }) {
        let url = '/articles';
        return this.fetchData(url);
    },
    // loadInitData() {
    //     let url = this.base_url + "/init";
    //     return this.fetchData(url);
    // },
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