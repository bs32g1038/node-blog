"use strict";
import api from './api.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        postList: [],
        cats: [],
        guestbooks: [],
        curPage: 1,
        pageCount: 0,
        guestbook_count: 0,
        post: {},
        init: false,
        links: [],
        ipc: '',
        user: {},
        site: {},
        comments: [],
        success: true,
        error_msg: ''
    },
    actions: {
        loadPost({commit}, id){
            return api.loadPost(id).then((data) => {
                commit('set_post', data)
            }).then(() => dispatch('loadInitData'));
        },
        loadPostList ({ commit,dispatch}, params) {
            return api.loadPostList(params).then((data) => {
                commit('set_postList', data)
            }).then(() => dispatch('loadInitData'));
        },
        loadInitData({commit,state}){

            if (state.init) {
                return Promise.resolve();
            }
            return api.loadInitData().then((data) => {
                commit('set_initData', data)
            })
        },
        loadGuestbookList({commit,dispatch}, params){
            return api.loadGuestbookList(params).then((data) => {
                commit('set_guestbookList', data);
            }).then(() => dispatch('loadInitData'));

        },
        loadSearchList({commit}, params){
            return api.loadSearchList(params).then((data) => {
                commit('set_postList', data)
            }).then(() => dispatch('loadInitData'));
        }
    },
    mutations: {
        set_post(state, {success,error_msg,data}){
            state.success = success;
            state.error_msg = error_msg;
            state.post = data.post;
            state.comments = data.comments;
        },
        set_postList (state, {success,error_msg,data}) {
            state.success = success;
            state.error_msg = error_msg;
            state.postList = data.docs;
            state.curPage = data.curPage;
            state.pageCount = data.pageCount;
        },
        set_initData(state, {cats, user, links, site }){
            state.cats = cats;
            state.user = user;
            state.links = links;
            state.site = site;
            state.init = true;
        },
        set_guestbookList(state, {success,error_msg,data}){
            state.success = success;
            state.error_msg = error_msg;
            state.guestbooks = data.guestbooks;
            state.curPage = data.curPage;
            state.pageCount = data.pageCount;
            state.guestbook_count = data.count
        }
    },
    getters: {
        post: (state) => state.post,
        postList: (state) => state.postList,
        guestbooks: (state)=>state.guestbooks,
        curPage: (state) =>state.curPage,
        pageCount: (state)=>state.pageCount,
        cats: (state)=>state.cats,
        user: (state)=>state.user,
        links: (state)=>state.links,
        site: (state)=>state.site,
        comments: (state)=>state.comments,
        error_msg: (state)=>state.error_msg,
        success: (state)=>state.success,
        init: (state)=>state.init
    }
})
