"use strict";
import api from './api.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        total_count: 0,
        items: [],
        item: {},
        menuId: 0,
        init: {
            existed: false, // 判断数据是否初始化
            site: {},
            user: {},
            links: [],
            categories: []
        },
        error_msg: '' // 记录错误信息
    },
    actions: {
        // loadPost({ commit, dispatch }, id) {
        //     return api.loadPost(id).then((data) => {
        //         commit('set_post', data)
        //     }).then(() => dispatch('loadInitData'));
        // },
        loadPostList({ commit, dispatch }, params) {
            return api.loadPostList(params).then((data) => {
                commit('SET_LIST', data)
            });
        },
        // loadInitData({ commit, state }) {
        //     if (state.init) {
        //         return Promise.resolve();
        //     }
        //     return api.loadInitData().then((data) => {
        //         commit('set_initData', data)
        //     })
        // },
        // loadGuestbookList({ commit, dispatch }, params) {
        //     return api.loadGuestbookList(params).then((data) => {
        //         commit('set_guestbookList', data);
        //     }).then(() => dispatch('loadInitData'));
        // },
        // loadSearchList({ commit, dispatch }, params) {
        //     return api.loadSearchList(params).then((data) => {
        //         commit('set_postList', data)
        //     }).then(() => dispatch('loadInitData'));
        // },
        // loadAbout({ commit, dispatch }) {
        //     return api.loadAbout().then((data) => {
        //         commit('set_about', data)
        //     }).then(() => dispatch('loadInitData'));
        // },
        // closeErrorMsg({ commit }) {
        //     commit('set_errorMsg');
        //     return Promise.resolve();
        // },
        loadMenuId({ commit }, menuId) {
            commit('set_menuId', menuId);
            return Promise.resolve();
        }
    },
    mutations: {
        SET_LIST(state, data) {
            state.total_count = data.total_count;
            state.items = data.items;
        },
        set_post(state, { success, error_msg, data }) {
            if (success) {
                state.post = data.post;
                state.comments = data.comments;
            }
            state.success = success;
            state.error_msg = error_msg;
        },
        set_postList(state, data) {
            state.list.total_count = data.total_count;
            state.list.items = data.items;
        },
        set_initData(state, { data }) {
            state.cats = data.cats;
            state.user = data.user;
            state.links = data.links;
            state.site = data.site;
        },
        set_guestbookList(state, { success, error_msg, data }) {
            if (success) {
                state.guestbooks = data.guestbooks;
                state.curPage = data.curPage;
                state.pageCount = data.pageCount;
                state.guestbookCount = data.count
            }
            state.success = success;
            state.error_msg = error_msg;
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
        },
        set_menuId(state, menuId) {
            state.menuId = menuId;
        }
    },
    getters: {
        postList: (state) => state.postList,
        postCount: (state) => state.post_count,
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
        about: (state) => state.about,
        menuId: (state) => state.menuId
    }
})