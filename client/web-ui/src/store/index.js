"use strict";
import api from './api.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
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
        LOAD_ARTICLE({ commit, dispatch }, id) {
            return api.loadArticle(id).then((data) => {
                commit('SET_ITEM', data)
            }).then(() => dispatch('LOAD_INIT_DATA'));
        },
        LOAD_ARTICLE_LIST({ commit, dispatch }, params) {
            return api.loadArticleList(params).then((data) => {
                commit('SET_LIST', data)
            }).then(() => dispatch('LOAD_INIT_DATA'));
        },
        LOAD_INIT_DATA({ commit, state }) {
            if (state.init.existed) {
                return Promise.resolve();
            }
            state.init.existed = true;
            return api.loadInitData().then((data) => {
                commit('SET_INIT', data)
            })
        },
        LOAD_GUESTBOOK_LIST({ commit, dispatch }, params) {
            return api.loadGuestbookList(params).then((data) => {
                commit('SET_LIST', data);
            }).then(() => dispatch('LOAD_INIT_DATA'));
        },
        // loadSearchList({ commit, dispatch }, params) {
        //     return api.loadSearchList(params).then((data) => {
        //         commit('set_postList', data)
        //     }).then(() => dispatch('loadInitData'));
        // },
        LOAD_ABOUT({ commit, dispatch }) {
            return api.loadAbout().then((data) => {
                commit('SET_ITEM', data)
            }).then(() => dispatch('loadInitData'));
        },
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
        SET_ITEM(state, data) {
            state.item = data;
        },
        SET_INIT(state, data) {
            state.categories = data.categories;
            state.user = data.user;
            state.links = data.links;
            state.site = data.setting;
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
        // curPage: (state) => {
        //    cur_page = state.curPage
        // },
        pageCount: (state) => {
            let len = state.items.length;
            let per_page = 1
            if (len >= 0) {
                per_page = len;
            }
            console.log(per_page)
            return Math.ceil(state.total_count / per_page)
        },
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