import api from '../api/article';
import * as types from '../constants/ActionTypes';
import { notification } from 'antd';

function requestArticle() {
    return {
        type: types.REQUEST_ARTICLE
    }
}

function receiveArticle(article) {
    return {
        type: types.RECEIVE_ARTICLE,
        article
    }
}

function requestArticles() {
    return {
        type: types.REQUEST_ARTICLES,
    }
}

function receiveArticles(articles, pagination) {
    return {
        type: types.RECEIVE_ARTICLES,
        articles,
        pagination
    }
}


function deleteArticleAction(id) {
    return {
        type: types.DELETE_ARTICLE,
        id
    }
}

/**
 * 加载文章列表
 * 
 * @param {number} page 
 * @param {number} per_page 
 */
export const loadArticles = function({ page, per_page }) {
    return dispatch => {
        dispatch(requestArticles())
        return api.loadArticleList({ page, per_page })
            .then(json => {
                // dispatch(actions.setPagination({ total: json.total_count }))
                return dispatch(receiveArticles(json.items, { total: json.total_count }))
            })
            .catch(err => { throw err; });
    }
}

export const loadArticle = (id) => {
    return dispatch => {
        dispatch(requestArticle());
        return api.loadArticle(id).then(function(res) {
            return dispatch(receiveArticle(res.data));
        });
    }
}

export const saveArticle = (id, data) => {
    return dispatch => {
        dispatch(requestArticle());
        return api.saveArticle(id, data).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已提交成功！',
            });
            return dispatch(receiveArticle(res.data));
        });
    }
}

export const deleteArticle = (id) => {
    return dispatch => {
        return api.deleteArticle(id).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '文章删除成功！',
            });
            dispatch(deleteArticleAction(id));
        });
    }
}