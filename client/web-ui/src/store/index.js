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
            return api.loadInitData().then((data) => {
                commit('SET_INIT', data)
            })
        },
        LOAD_GUESTBOOK_LIST({ commit, dispatch }, params) {
            return api.loadGuestbookList(params).then((data) => {
                commit('SET_LIST', data);
            }).then(() => dispatch('LOAD_INIT_DATA'));
        },
        LOAD_SEARCHE_LIST({ commit, dispatch }, params) {
            return api.loadSearchList(params).then((data) => {
                commit('SET_LIST', data)
            }).then(() => dispatch('LOAD_INIT_DATA'));
        },
        LOAD_ABOUT({ commit, dispatch }) {
            return api.loadAbout().then((data) => {
                commit('SET_ITEM', data)
            }).then(() => dispatch('LOAD_INIT_DATA'));
        },
        LOAD_MENU_ID({ commit }, menuId) {
            commit('SET_MENU_ID', menuId);
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
            state.init.existed = true;            
            state.init.categories = data.categories;
            state.init.user = data.user;
            state.init.links = data.links;
            state.init.site = data.setting;
        },
        SET_MENU_ID(state, menuId) {
            state.menuId = menuId;
        }
    },
    getters: {
        pageCount: (state) => {
            let len = state.items.length;
            let per_page = 1
            if (len >= 0) {
                per_page = len;
            }
            return Math.ceil(state.total_count / per_page)
        },
    }
})