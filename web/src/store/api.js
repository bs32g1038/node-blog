"use strict";

import 'whatwg-fetch';

//import fetch from 'isomorphic-fetch';

export default {

    base_url: 'http://127.0.0.1/api',

    loadPost(id){

        let baseUrl = "/api/post/" + id;

        return fetch(baseUrl).then(res => res.json())
            .then(data => data)
            .catch(e => console.log("uh error", e))

    },
    loadPostList ({category,page}) {

        var page = page || 1;

        let url = this.base_url + "/index/page/" + page;

        if (category) {
            url = this.base_url + "/category/" + category + "/page/" + page;
        }

        return fetch(url).then(res => res.json())
            .then(data => data)
            .catch(e => console.log("uh error", e))
    },

    loadInitData(){

        let url = this.base_url + "/init";

        return fetch(url).then(res => res.json())
            .then(data => data)
            .catch(e => console.log("uh error", e))

    },

    loadGuestbookList({page}){

        var page = page || 1;

        let url = this.base_url + "/guestbook/page/" + page;

        return fetch(url).then(res => res.json())
            .then(data => data)
            .catch(e => console.log("uh error", e))

    },

    loadSearchList({key,page}){

        var page = page || 1;

        var key = key || '';

        let url = this.base_url + "/post/search?" + 'key=' + key + '&page=' + page;

        return fetch(url).then(res => res.json())
            .then(data => data)
            .catch(e => console.log("uh error", e))

    }
}

