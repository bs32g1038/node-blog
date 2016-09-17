"use strict";
import 'whatwg-fetch'

export default {

    loadPost(id){

        let baseUrl = "/api/post/" + id;

        return fetch(baseUrl).then(res => res.json())
            .then(data => data)
            .catch(e => console.log("uh error", e))

    },
    loadPostList ({category,page}) {

        var page = page || 1;

        let baseUrl = "/api/index/page/" + page;

        if (category) {
            baseUrl = "/api/category/" + category + "/page/" + page;
        }

        return fetch(baseUrl).then(res => res.json())
            .then(data => data)
            .catch(e => console.log("uh error", e))
    },

    loadInitData(){

        let baseUrl = "/api/init";

        return fetch(baseUrl).then(res => res.json())
            .then(data => data)
            .catch(e => console.log("uh error", e))

    },

    loadGuestbookList({page}){

        var page = page || 1;

        let baseUrl = "/api/guestbook/page/" + page;

        return fetch(baseUrl).then(res => res.json())
            .then(data => data)
            .catch(e => console.log("uh error", e))

    },

    loadSearchList({key,page}){

        var page = page || 1;

        var key = key || '';

        let baseUrl = "/api/post/search?" + 'key=' + key + '&page=' + page;

        window.location.href = "/post/search?" + 'key=' + key + '&page=' + page;

        return fetch(baseUrl).then(res => res.json())
            .then(data => data)
            .catch(e => console.log("uh error", e))

    }
}

