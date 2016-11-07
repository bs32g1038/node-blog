"use strict";
import api from './api.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        postList: [],
        postCount: [],
        archives: [],
        cats: [],
        guestbooks: [],
        curPage: 1,
        pageCount: 0,
        guestbookCount: 0,
        post: {},
        init: false,
        links: [],
        ipc: '',
        user: {},
        site: {},
        comments: [],
        success: true,
        error_msg: '',
        about: {},
        err_count: 0,
        load_list: true
    },
    actions: {
        loadPost({ commit, dispatch }, id) {
            return api.loadPost(id).then((data) => {
                commit('set_post', data)
            }).then(() => dispatch('loadInitData'));
        },
        loadPostList({ commit, dispatch }, params) {
            return api.loadPostList(params).then((data) => {
                commit('set_postList', data)
            }).then(() => dispatch('loadInitData'));
        },
        loadInitData({ commit, state }) {
            if (state.init) {
                return Promise.resolve();
            }
            return api.loadInitData().then((data) => {
                commit('set_initData', data)
            })
        },
        loadArchives({ commit, dispatch }, params) {
            return api.loadArchives(params).then((data) => {
                commit('set_archives', data);
            }).then(() => dispatch('loadInitData'));
        },
        loadGuestbookList({ commit, dispatch }, params) {
            return api.loadGuestbookList(params).then((data) => {
                commit('set_guestbookList', data);
            }).then(() => dispatch('loadInitData'));
        },
        loadSearchList({ commit, dispatch }, params) {
            return api.loadSearchList(params).then((data) => {
                commit('set_postList', data)
            }).then(() => dispatch('loadInitData'));
        },
        loadAbout({ commit, dispatch }) {
            return api.loadAbout().then((data) => {
                commit('set_about', data)
            }).then(() => dispatch('loadInitData'));
        },
        closeErrorMsg({ commit }) {
            commit('set_errorMsg');
            return Promise.resolve();
        }
    },
    mutations: {
        set_post(state, { success, error_msg, data }) {
            if (success) {
                state.post = data.post;
                state.comments = data.comments;
            }
            state.success = success;
            state.error_msg = error_msg;
        },
        set_postList(state, { success, error_msg, data }) {

            if (success) {
                state.postList = data.docs;
                state.curPage = data.curPage;
                state.pageCount = data.pageCount;
            }
            state.success = success;
            state.error_msg = error_msg;
        },
        set_initData(state, { success, error_msg, data }) {

            if (success) {
                state.cats = data.cats;
                state.user = data.user;
                state.links = data.links;
                state.site = data.site;
                state.init = true;
            }
            state.success = success;
            state.error_msg = error_msg;
        },
        set_archives(state, { success, error_msg, data }) {

            if (success) {
                state.archives = data.archives;
                state.curPage = data.curPage;
                state.pageCount = data.pageCount;
                state.postCount = data.count;
            }
            state.success = true;
            state.error_msg = error_msg;
        },
        set_guestbookList(state, { success, error_msg, data }) {
            if (success) {
                state.guestbooks = data.guestbooks;
                state.curPage = data.curPage;
                state.pageCount = data.pageCount;
                state.guestbookCount = data.count
            }
            state.success = true;
            state.error_msg = error_msg;
            state.load_list = false
        },
        set_about(state, { success, error_msg, data }) {
            if (success) {
                state.about = data.about;
            }
            state.success = success;
            state.error_msg = error_msg;
        },
        set_errorMsg(state) {
            state.success = true;
        }
    },
    getters: {
        post: (state) => state.post,
        postList: (state) => state.postList,
        postCount:(state) => state.post_count,
        archives: (state) => state.archives,
        guestbooks: (state) => state.guestbooks,
        curPage: (state) => state.curPage,
        pageCount: (state) => state.pageCount,
        cats: (state) => state.cats,
        user: (state) => state.user,
        links: (state) => state.links,
        site: (state) => state.site,
        comments: (state) => state.comments,
        error_msg: (state) => state.error_msg,
        success: (state) => state.success,
        init: (state) => state.init,
        about: (state) => state.about
    }
})