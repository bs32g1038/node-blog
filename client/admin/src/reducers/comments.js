/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-14 15:05:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-10 23:07:11
 */
import * as types from '../constants/ActionTypes';

const initialState = {
    items: null,
    item: null,
    loading: false
}

export default function(state = initialState, action) {
    let comments = {};
    switch (action.type) {
        case types.RECEIVE_COMMENTS:
            return Object.assign({}, state, {
                items: action.comments,
                pagination: action.pagination,
                loading: false
            });
        case types.ADD_COMMENT:
            comments = { ...state };
            comments.items.unshift(action.comment);
            comments.total_count++;
            return comments;
        case types.DELETE_COMMENT:
            comments = { ...state };
            comments.items = comments.items.filter((item) => (item._id !== action.id));
            comments.total_count--;
            return comments;
        case types.REQUEST_COMMENTS:
            return Object.assign({}, state, {
                loading: true
            });
        default:
            return state
    }
}