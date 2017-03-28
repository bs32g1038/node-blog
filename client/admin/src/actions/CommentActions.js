/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-14 15:04:45 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-14 15:17:28
 */

import commentApi from '../api/comment';
import * as types from '../constants/ActionTypes';
import { notification } from 'antd';

function requestComments() {
    return {
        type: types.REQUEST_COMMENTS
    }
}

function receiveComments(comments, pagination) {
    return {
        type: types.RECEIVE_COMMENTS,
        comments,
        pagination
    }
}

function addCommentAction(comment) {
    return {
        type: types.ADD_COMMENT,
        comment
    }
}

function deleteCommentAction(id) {
    return {
        type: types.DELETE_COMMENT,
        id
    }
}

function updateCommentPassAction(id, pass) {
    return {
        type: types.UPDATE_COMMENT_PASS,
        id,
        pass
    }
}

export const loadComments = ({ page, per_page }) => {
    return dispatch => {
        dispatch(requestComments())
        return commentApi.loadComments({ page, per_page })
            .then(json => {
                return dispatch(receiveComments(json.items, { total: json.total_count }))
            }).catch(err => { throw err; });
    }
}

export const saveComment = (data) => {
    return dispatch => {
        return commentApi.saveComment(data).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已提交成功！',
            });
            return dispatch(addCommentAction(res.data))
        });
    }
}

export const deleteComment = (id) => {
    return dispatch => {
        return commentApi.deleteComment(id).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已删除成功！',
            });
            return dispatch(deleteCommentAction(id))
        });
    }
}

export const handlePass = (id, pass) => {
    return dispatch => {
        commentApi.handlePass(id, pass).then((res) => {
            notification.success({
                message: '操作提示',
                description: (pass ? '内容已设置为审核通过！' : '内容已设置为审核未通过'),
            });
            return dispatch(updateCommentPassAction(id, pass));
        });
    }
}