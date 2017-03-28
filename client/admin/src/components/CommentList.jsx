import React, { Component } from 'react';
import { Layout, Breadcrumb, Button, } from 'antd';
const { Content } = Layout;
import CommentListItem from './CommentListItem';
import CommentReplyModal from './CommentReplyModal'
import { loadComments, saveComment, deleteComment, handlePass } from '../actions/CommentActions';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            visible: false,
            comment: null
        }
    }
    showModal = (comment) => {
        this.setState({ comment: comment, visible: true })
    }
    onOk = () => {
        const { dispatch } = this.props;
        this.form.validateFields((err, values) => {
            if (!err) {
                dispatch(saveComment(values));
                this.setState({ visible: false })
            }
        });
    }
    onCancel = () => {
        this.setState({ visible: false })
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    handleCommentPass = (id, pass) => {
        const { dispatch } = this.props;
        dispatch(handlePass(id, pass))
    }
    deleteComment = (id) => {
        const { dispatch } = this.props;
        dispatch(deleteComment(id))
    }
    onCommentListChange = (pagination) => {
        const { dispatch } = this.props;
        dispatch(loadComments({
            per_page: pagination.pageSize,
            page: pagination.current
        }))
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadComments({}));
    }
    render() {
        const { items, pagination, loading } = this.props.comments;
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Content>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>文章管理</Breadcrumb.Item>
                    <Breadcrumb.Item>评论列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className='panel'>
                    <Button type="danger"><i className="fa fa-trash-o fa-fw"></i>&nbsp;&nbsp;批量删除</Button>
                </div>
                <CommentListItem
                    rowSelection={rowSelection}
                    dataSource={items}
                    loading={loading}
                    pagination={pagination}
                    onChange={this.onCommentListChange}
                    handlePass={this.handleCommentPass}
                    replyComment={this.showModal}
                    deleteComment={this.deleteComment}
                ></CommentListItem>
                <CommentReplyModal
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.onCancel}
                    onOk={this.onOk}
                    comment={this.state.comment}
                >
                </CommentReplyModal>
            </Content>
        );
    }

}

export default CommentList;