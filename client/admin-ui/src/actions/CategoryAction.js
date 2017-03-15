import categoryApi from '../api/category';
import { notification } from 'antd';
import * as types from '../constants/ActionTypes';

function requestCategories() {
    return {
        type: types.REQUEST_CATEGORYS
    }
}

function receiveCategories(categories) {
    return {
        type: types.RECEIVE_CATEGORYS,
        categories
    }
}

function receiveCategory(category) {
    return {
        type: types.RECEIVE_CATEGORYS,
        category
    }
}

function saveCategoryAction(id, category) {
    return {
        type: types.SAVE_CATEGORY,
        id,
        category
    }
}

function deleteCategoryAction(id) {
    return {
        type: types.DELETE_CATEGORY,
        id: id
    }
}

export const loadCategories = () => {
    return dispatch => {
        dispatch(requestCategories)
        return categoryApi.loadCategories()
            .then(json => {
                return dispatch(receiveCategories(json.items))
            });
    }
}

/**
 * 提交分类
 */
export const saveCategory = (id, data) => {
    return dispatch => {
        dispatch(requestCategories)
        return categoryApi.saveCategory(id, data).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已提交成功！',
            });
            console.log(data)
            return dispatch(saveCategoryAction(id, res.data))
        });
    }
}

export const loadCategory = (id) => {
    return dispatch => {
        dispatch(requestCategories)
        return categoryApi.loadCategory(id).then(function(res) {
            return dispatch(receiveCategory(res.data))
        });
    }
}

export const deleteCategory = (id) => {
    return dispatch => {
        return categoryApi.deleteCategory(id).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已删除成功！',
            });
            return dispatch(deleteCategoryAction(id))
        });
    }
}