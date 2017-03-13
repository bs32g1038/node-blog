import categoryApi from '../api/category';
import { notification } from 'antd';
const types = {
    CATEGORY_LIST: 'CATEGORY/CATEGORY_LIST',
    LOADING: 'CATEGORY/LOADING',
    DELETE: 'CATEGORY/DELETE',
    ADD: 'CATEGORY/ADD',
    VISIBLE: 'CATEGORY/VISIBLE'
}

const initialState = {
    items: null,
    item: null,
    loading: false,
    total_count: 0,
    pagination: {},
    selectedRowKeys: [],
    error: null,
    visible: false
}

export default function(state = initialState, action) {
    let categories = {};
    switch (action.type) {
        case types.CATEGORY_LIST:
            return Object.assign({}, state, {
                items: action.items,
                total_count: action.total_count,
                error: null
            });
        case types.ADD:
            categories = { ...state };
            categories.items.unshift(action.item);
            categories.total_count++;
            return categories;
        case types.DELETE:
            categories = { ...state };
            categories.items = categories.items.filter((item) => (item._id !== action.category_id));
            categories.total_count--;
            return categories;
        case types.LOADING:
            return Object.assign({}, state, {
                loading: action.loading
            });
        case types.VISIBLE:
            return Object.assign({}, state, {
                visible: action.visible
            });
        default:
            return state
    }
}


export const actions = {
    getCategories: (items, total_count) => {
        return {
            type: types.CATEGORY_LIST,
            items: items || [],
            total_count
        }
    },
    setLoading: (loading) => {
        return {
            type: types.LOADING,
            loading
        }
    },
    setSelectedRowKeys: (selectedRowKeys) => {
        return {
            type: types.SELECTED_ROW_KEYS,
            selectedRowKeys
        }
    },
    deleteCategory: (id) => {
        return {
            type: types.DELETE,
            category_id: id
        }
    },
    showModal: () => {
        return {
            type: types.VISIBLE,
            visible: true
        }
    },
    handleCancel: () => {
        return {
            type: types.VISIBLE,
            visible: false
        }
    },
    addCategory: (item) => {
        return {
            type: types.ADD,
            item
        }
    }
}

/**
 * 加载分类列表
 */
export const loadCategories = (page, per_page) => {
    return dispatch => {
        dispatch(actions.setLoading(true))
        return categoryApi.loadCategories()
            .then(json => {
                dispatch(actions.getCategories(json.items, json.total_count))
                return dispatch(actions.setLoading(false))
            });
    }
}

/**
 * 提交分类
 */
export const saveCategory = (id, data) => {
    return dispatch => {
        dispatch(actions.setLoading(true))
        return categoryApi.saveCategory(id, data).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已提交成功！',
            });
            dispatch(actions.addCategory(res.data))
            return dispatch(actions.setLoading(false))
        });
    }
}

/**
 * 删除分类
 * 
 * @param {string} id 
 */
export const deleteCategory = (id) => {
    return dispatch => {
        return categoryApi.deleteCategory(id).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已删除成功！',
            });
            return dispatch(actions.deleteCategory(id))
        });
    }
}

/**
 * 显示模态对话框
 */
export const showModal = () => {
    return dispatch => {
        return dispatch(actions.showModal());
    }
}

/**
 * 隐藏模态对话框
 */
export const handleCancel = () => {
    return dispatch => {
        return dispatch(actions.handleCancel());
    }
}