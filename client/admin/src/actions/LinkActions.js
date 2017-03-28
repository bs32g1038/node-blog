import linkApi from '../api/link';
import * as types from '../constants/ActionTypes';
import { notification } from 'antd';

function requestLinks() {
    return {
        type: types.REQUEST_LINKS
    }
}

function receiveLinks(links) {
    return {
        type: types.RECEIVE_LINKS,
        links
    }
}

function saveLinkAction(id, link) {
    return {
        type: types.SAVE_LINK,
        id,
        link
    }
}

function deleteLinkAction(id) {
    return {
        type: types.DELETE_LINK,
        id
    }
}

export const loadLinks = ({ page, per_page }) => {
    return dispatch => {
        dispatch(requestLinks())
        return linkApi.loadLinks({ page, per_page })
            .then(res => {
                return dispatch(receiveLinks(res.data.items))
            }).catch(err => { throw err; });
    }
}

export const saveLink = (id, data) => {
    return dispatch => {
        return linkApi.saveLink(id, data).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已提交成功！',
            });
            return dispatch(saveLinkAction(id, res.data));
        });
    }
}

export const deleteLink = (id) => {
    return dispatch => {
        return linkApi.deleteLink(id).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已删除成功！',
            });
            return dispatch(deleteLinkAction(id));
        });
    }
}