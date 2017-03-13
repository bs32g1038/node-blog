import api from '../api';
import { notification } from 'antd';

export const types = {
    ARTICLE_LIST: 'ARTICLE/ARTICLE_LIST',
    ARTICLE_EDIT: 'ARTICLE/ARTICLE_EDIT',
    ARTICLE_ONE: 'ARTICLE/ARTICLE_ONE',
    PAGINATION: 'ARTICLE/PAGINATION',
    SELECTED_ROW_KEYS: 'ARTICLE/SELECTED_ROW_KEYS',
    LOADING: 'ARTICLE/LOADING',
    ARTICLE_CATEGORIES: 'ARTICLE/ARTICLE_CATEGORIES'
}

export const initialState = {
    items: null,
    total_count: 0,
    loading: false,
    pagination: {},
    selectedRowKeys: [],
    error: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case types.ARTICLE_LIST:
            return Object.assign({}, state, {
                items: action.items,
                total_count: action.total_count,
                error: null
            });
        case types.ARTICLE_CATEGORIES:
            return Object.assign({}, state, {
                categories: action.categories
            });
        case types.ARTICLE_ONE:
            return Object.assign({}, state, {
                item: action.item
            });
        case types.PAGINATION:
            return Object.assign({}, state, {
                pagination: action.pagination,
            });
        case types.SELECTED_ROW_KEYS:
            return Object.assign({}, state, {
                selectedRowKeys: action.selectedRowKeys
            });
        case types.LOADING:
            return Object.assign({}, state, {
                loading: action.loading
            });
        default:
            return state
    }
}

export const actions = {
    getArticles: (items, total_count) => {
        return {
            type: types.ARTICLE_LIST,
            items: items,
            total_count
        }
    },
    getCategories: (categories) => {
        return {
            type: types.ARTICLE_CATEGORIES,
            categories: categories
        }
    },
    getArticle: (article) => {
        return {
            type: types.ARTICLE_ONE,
            item: article,
        }
    },
    setPagination: (pagination) => {
        return {
            type: types.PAGINATION,
            pagination: pagination
        }
    },
    setSelectedRowKeys: (selectedRowKeys) => {
        return {
            type: types.SELECTED_ROW_KEYS,
            selectedRowKeys
        }
    },
    setLoading: (loading) => {
        return {
            type: types.LOADING,
            loading
        }
    }
}

/**
 * 加载文章列表
 * 
 * @param {number} page 
 * @param {number} per_page 
 */
export const loadArticles = (page, per_page) => {
    return dispatch => {
        dispatch(actions.setLoading(true))
        return api.loadArticleList({ page, per_page })
            .then(json => {
                dispatch(actions.setPagination({ total: json.total_count }))
                dispatch(actions.getArticles(json.items, json.total_count, false))
                return dispatch(actions.setLoading(false))
            })
            .catch(error => console.log(error))
    }
}

/**
 * 加载单篇文章附带分类
 * 
 * @param {string} id 
 */
export const loadArticle = (id) => {
    return dispatch => {
        dispatch(actions.setLoading(true))
        return api.loadArticle(id)
            .then(article => {
                dispatch(actions.getArticle(article))
                return dispatch(actions.setLoading(false))
            })
    }
}

/**
 * 加载文章分类
 */
export const loadCategories = () => {
    return dispatch => {
        dispatch(actions.setLoading(true))

        return api.loadCategories().then(function(categories) {
            dispatch(actions.getCategories(categories.items))
            return dispatch(actions.setLoading(false))
        })
    }
}

/**
 * 提交文章
 */
export const saveArticle = (id, data) => {
    return dispatch => {
        dispatch(actions.setLoading(true))
        return api.saveArticle(id, data).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已提交成功！',
            });
            return dispatch(actions.setLoading(false))
        });
    }
}

export const handleTableChange = (pagination, filters, sorter) => {
    return dispatch => {
        dispatch(actions.setLoading(true))
        return api.loadArticleList({
            per_page: pagination.pageSize,
            page: pagination.current
        }).then(json => {
            dispatch(actions.setPagination(pagination))
            dispatch(actions.getArticles(json.items, json.total_count, false))
            return dispatch(actions.setLoading(false))
        })
    }
}

export const onSelectChange = (selectedRowKeys) => {
    return dispatch => {
        return dispatch(actions.setSelectedRowKeys(selectedRowKeys))
    }
}