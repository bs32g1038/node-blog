import 'whatwg-fetch';
import config from '../config.js';
export default {

    base_url: config.api_host,

    fetchData(url) {
        return fetch(url).then(res => res.json())
            .then(data => data)
            .catch(e => console.log("uh error", e))
    },

    loadPost(id) {
        let url = this.base_url + "/post/" + id;
        return this.fetchData(url);
    },

    loadPostList({ category, page }) {
        page = page || 1;
        let url = this.base_url + "/index/page/" + page;
        if (category) {
            url = this.base_url + "/category/" + category + "/page/" + page;
        }
        return this.fetchData(url);
    },

    loadInitData() {
        let url = this.base_url + "/init";
        return this.fetchData(url);
    },

    loadArchives({ page }) {
        page = page || 1;
        let url = this.base_url + "/archives/page/" + page;
        return this.fetchData(url);
    },
    loadGuestbookList({ page }) {
        page = page || 1;
        let url = this.base_url + "/guestbook/page/" + page;
        return this.fetchData(url);
    },

    loadSearchList({ key, page }) {
        page = page || 1;
        key = key || '';
        let url = encodeURI(this.base_url + "/post/search?" + 'key=' + key + '&page=' + page);
        return this.fetchData(url);
    },

    loadAbout() {
        let url = this.base_url + "/about";
        return this.fetchData(url);
    }
}