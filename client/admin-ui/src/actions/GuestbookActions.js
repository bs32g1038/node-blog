/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-14 15:04:45 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-15 12:57:31
 */

import guestbookApi from '../api/guestbook';
import * as types from '../constants/ActionTypes';
import { notification } from 'antd';

function requestGuestbooks() {
    return {
        type: types.REQUEST_GUESTBOOKS
    }
}

function receiveGuestbooks(guestbooks, pagination) {
    return {
        type: types.RECEIVE_GUESTBOOKS,
        guestbooks,
        pagination
    }
}

function updateReplyContentAction(id, reply_content) {
    return {
        type: types.REPLY_GUESTBOOK,
        id,
        reply_content
    }
}

function updateGuestbookPassAction(id, pass) {
    return {
        type: types.UPDATE_GUESTBOOK_PASS,
        id,
        pass
    }
}

function deleteGuestbookAction(id) {
    return {
        type: types.DELETE_GUESTBOOK,
        id
    }
}

export const loadGuestbooks = ({ page, per_page }) => {
    return dispatch => {
        dispatch(requestGuestbooks())
        return guestbookApi.loadGuestbooks({ page, per_page })
            .then(res => {
                return dispatch(receiveGuestbooks(res.data.items, { total: res.data.total_count }))
            }).catch(err => { throw err; });
    }
}

export const deleteGuestbook = (id) => {
    return dispatch => {
        return guestbookApi.deleteGuestbook(id).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已删除成功！',
            });
            return dispatch(deleteGuestbookAction(id))
        });
    }
}

export const updateGuestbookReplyContent = (id, reply_content) => {
    return dispatch => {
        return guestbookApi.updateReplyContent(id, reply_content).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已提交成功！',
            });
            return dispatch(updateReplyContentAction(id, reply_content))
        });
    }
}

export const handlePass = (id, pass) => {
    return dispatch => {
        guestbookApi.handlePass(id, pass).then((res) => {
            notification.success({
                message: '操作提示',
                description: (pass ? '内容已设置为审核通过！' : '内容已设置为审核未通过'),
            });
            return dispatch(updateGuestbookPassAction(id, pass));
        });
    }
}