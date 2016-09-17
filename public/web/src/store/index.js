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
        initData: {},
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
            })
        },
        loadPostList ({commit}, params) {
            return api.loadPostList(params).then((data) => {
                commit('set_postList', data)
            })
        },
        loadInitData({commit}){
            return api.loadInitData().then((data) => {
                commit('set_initData', data)
            })

        },
        loadGuestbookList({commit}, params){
            return api.loadGuestbookList(params).then((data) => {
                commit('set_guestbookList', data)
            })
        },
        loadSearchList({commit}, params){
            return api.loadSearchList(params).then((data) => {
                commit('set_postList', data)
            })
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
    }
})
