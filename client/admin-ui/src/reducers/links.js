/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-15 13:38:43 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-15 15:22:37
 */


import * as types from '../constants/ActionTypes';

const initialState = {
    items: null,
    loading: false
}

export default function(state = initialState, action) {
    let links = {};
    switch (action.type) {
        case types.RECEIVE_LINKS:
            return Object.assign({}, state, {
                items: action.links,
                loading: false
            });
        case types.SAVE_LINK:
            links = { ...state };
            if (action.id) {
                links.items = links.items.map(function(item) {
                    if (action.id === item._id) {
                        item = action.link;
                    }
                    return item;
                });
                return links;
            }
            links.items.unshift(action.link);
            return links;
        case types.DELETE_LINK:
            return {
                ...state,
                items: state.items.filter((item) => (item._id !== action.id))
            }
        case types.REQUEST_LINKS:
            return Object.assign({}, state, {
                loading: true
            });
        default:
            return state
    }
}