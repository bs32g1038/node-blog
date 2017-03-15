/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-13 22:51:25 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-14 14:32:07
 */

import * as types from '../constants/ActionTypes';

const initialState = {
    items: null,
    item: null,
    loading: false
}

export default function(state = initialState, action) {
    let categories = {};
    switch (action.type) {
        case types.RECEIVE_CATEGORYS:
            return Object.assign({}, state, {
                loading: false,
                items: action.categories
            });
        case types.SAVE_CATEGORY:
            categories = { ...state };
            if (action.id) {
                categories.items = categories.items.map(function(item) {
                    if (action.id === item._id) {
                        item = action.category;
                    }
                    return item;
                });
                return categories;
            }
            categories.items.unshift(action.category);
            return categories;
        case types.DELETE_CATEGORY:
            categories = { ...state };
            categories.items = categories.items.filter((item) => (item._id !== action.id));
            return categories;
        case types.REQUEST_CATEGORYS:
            return Object.assign({}, state, {
                loading: true
            });
        case types.RECEIVE_CATEGORY:
            return Object.assign({}, state, {
                loading: false,
                item: action.category
            });
        default:
            return state
    }
}