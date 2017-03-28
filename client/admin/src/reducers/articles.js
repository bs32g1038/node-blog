/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-13 15:06:19 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-14 13:35:46
 */
import * as types from '../constants/ActionTypes';

export const initialState = {
    items: null,
    item: null,
    total_count: 0,
    loading: false,
    pagination: {},
    selectedRowKeys: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case types.RECEIVE_ARTICLES:
            return Object.assign({}, state, {
                loading: false,
                items: action.articles,
                pagination: action.pagination
            });
        case types.REQUEST_ARTICLES:
            return Object.assign({}, state, {
                loading: true
            });
        case types.RECEIVE_ARTICLE:
            return Object.assign({}, state, {
                loading: false,
                item: action.article,
            });
        case types.REQUEST_ARTICLE:
            return Object.assign({}, state, {
                loading: true
            });
        case types.DELETE_ARTICLE:
            return {
                ...state,
                items: state.items.filter((item) => (item._id !== action.id)),
                total_count: state.total_count - 1
            }
        default:
            return state
    }
}