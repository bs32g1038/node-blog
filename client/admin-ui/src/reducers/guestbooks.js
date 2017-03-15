/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-14 15:05:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-15 12:57:40
 */
import * as types from '../constants/ActionTypes';

const initialState = {
    items: null,
    loading: false,
    pagination: {}
}

export default function(state = initialState, action) {
    let guestbooks = {};
    switch (action.type) {
        case types.RECEIVE_GUESTBOOKS:
            return Object.assign({}, state, {
                items: action.guestbooks,
                pagination: action.pagination,
                loading: false
            });
        case types.REPLY_GUESTBOOK:
            guestbooks = { ...state };
            guestbooks.items = guestbooks.items.map(function(item) {
                if (action.id === item._id) {
                    item.reply_content = action.reply_content
                }
                return item;
            })
            return guestbooks;
        case types.DELETE_GUESTBOOK:
            guestbooks = { ...state };
            guestbooks.items = guestbooks.items.filter((item) => (item._id !== action.id));
            guestbooks.total_count--;
            return guestbooks;
        case types.UPDATE_GUESTBOOK_PASS:
            guestbooks = { ...state };
            guestbooks.items = guestbooks.items.map(function(item) {
                if (action.id === item._id) {
                    item.pass = action.pass
                }
                return item;
            })
            return guestbooks
        case types.REQUEST_GUESTBOOKS:
            return Object.assign({}, state, {
                loading: true
            });
        default:
            return state
    }
}