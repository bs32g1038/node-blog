import commentApi from '../api/comment';
import { notification } from 'antd';

const types = {
    COMMENT_LIST: 'COMMENT/COMMENT_LIST',
    LOADING: 'COMMENT/LOADING',
    PAGINATION: 'COMMENT/PAGINATION',
    DELETE: 'COMMENT/DELETE',
    ADD: 'COMMENT/ADD',
    VISIBLE: 'COMMENT/VISIBLE',
    SELECTED_ROW_KEYS: 'COMMENT/SELECTED_ROW_KEYS',
    UPDATE_PASS: 'COMMENT/UPDATE_PASS'
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
    let comments = {};
    switch (action.type) {
        case types.COMMENT_LIST:
            return Object.assign({}, state, {
                items: action.items,
                total_count: action.total_count,
                error: null
            });
        case types.ADD:
            comments = { ...state };
            comments.items.unshift(action.item);
            comments.total_count++;
            return comments;
        case types.DELETE:
            comments = { ...state };
            comments.items = comments.items.filter((item) => (item._id !== action.comment_id));
            comments.total_count--;
            return comments;
        case types.UPDATE_PASS:
            comments = { ...state };
            comments.items = comments.items.map(function(item) {
                if (action._id === item._id) {
                    item.pass = action.pass
                }
                return item;
            })
            return comments
        case types.LOADING:
            return Object.assign({}, state, {
                loading: action.loading
            });
        case types.PAGINATION:
            return Object.assign({}, state, {
                pagination: action.pagination,
            });
        case types.SELECTED_ROW_KEYS:
            return Object.assign({}, state, {
                selectedRowKeys: action.selectedRowKeys
            });
        case types.VISIBLE:
            return Object.assign({}, state, {
                item: action.item,
                visible: action.visible
            });
        default:
            return state
    }
}


export const actions = {
    getComments: (items, total_count) => {
        return {
            type: types.COMMENT_LIST,
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
    addComment: (item) => {
        return {
            type: types.ADD,
            item
        }
    },
    deleteComment: (id) => {
        return {
            type: types.DELETE,
            comment_id: id
        }
    },
    updateCommentPass: (id, pass) => {
        return {
            type: types.UPDATE_PASS,
            _id: id,
            pass: pass
        }
    },
    showModal: (item) => {
        return {
            type: types.VISIBLE,
            item: item,
            visible: true
        }
    },
    handleCancel: () => {
        return {
            type: types.VISIBLE,
            visible: false
        }
    }
}

/**
 * 加载分类列表
 */
export const loadComments = (page, per_page) => {
    return dispatch => {
        dispatch(actions.setLoading(true))
        return commentApi.loadComments({ page, per_page })
            .then(json => {
                dispatch(actions.setPagination({ total: json.total_count }))
                dispatch(actions.getComments(json.items, json.total_count))
                return dispatch(actions.setLoading(false))
            });
    }
}

/**
 * ant design 表格change事件
 */
export const handleTableChange = (pagination, filters, sorter) => {
    return dispatch => {
        console.log(pagination)
        dispatch(actions.setLoading(true))
        return commentApi.loadComments({
            per_page: pagination.pageSize,
            page: pagination.current
        }).then(json => {
            dispatch(actions.setPagination(pagination))
            dispatch(actions.getComments(json.items, json.total_count, false))
            return dispatch(actions.setLoading(false))
        })
    }
}

export const onSelectChange = (selectedRowKeys) => {
    return dispatch => {
        return dispatch(actions.setSelectedRowKeys(selectedRowKeys))
    }
}

/**
 * 删除分类
 * 
 * @param {string} id 
 */
export const deleteComment = (id) => {
    return dispatch => {
        return commentApi.deleteComment(id).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已删除成功！',
            });
            return dispatch(actions.deleteComment(id))
        });
    }
}

/**
 * 
 * 保存回复评论，这里针对的是博主
 */
export const saveComment = (data) => {
    return dispatch => {
        dispatch(actions.setLoading(true))
        return commentApi.saveComment(data).then(function(res) {
            notification.success({
                message: '操作提示',
                description: '内容已提交成功！',
            });
            dispatch(actions.addComment(res.data))
            dispatch(actions.handleCancel());
            return dispatch(actions.setLoading(false))
        });
    }
}

export const handlePass = (id, pass) => {
    return dispatch => {
        dispatch(actions.setLoading(true))
        commentApi.handlePass(id, pass).then((res) => {
            notification.success({
                message: '操作提示',
                description: (pass ? '内容已设置为审核通过！' : '内容已设置为审核未通过'),
            });
            dispatch(actions.updateCommentPass(id, pass));
            return dispatch(actions.setLoading(false))
        });
    }
}
/**
 * 显示模态对话框
 */
export const showModal = (item) => {
    return dispatch => {
        return dispatch(actions.showModal(item));
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