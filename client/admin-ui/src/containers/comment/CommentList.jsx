import React from 'react';
import { Layout, Breadcrumb, Table, Button, Popconfirm } from 'antd';
const { Content } = Layout;
import ReplyCommentModal from './ReplyCommentModal';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as commentActions from '../../redux/modules/comment'
const content = React.createClass({

    getInitialState() {
        const columns = [{
            title: '文章标题',
            dataIndex: 'article_title',
            render: (text, record) => (<a href={'article/' + record.article._id} target="_blank">{record.article.title}</a>),
        }, {
            title: '创建时间',
            dataIndex: 'create_at',
        }, {
            title: '昵称',
            dataIndex: 'nick_name'
        }, {
            title: '身份',
            dataIndex: 'identity',
            render: (text, record) => (
                <span>{record.identity === 1 ? '游客' : '管理员'}</span>
            )
        }, {
            title: '内容',
            dataIndex: 'content',
            width: 250,
        }, {
            title: '邮箱',
            dataIndex: 'email'
        }, {
            title: '审核',
            dataIndex: 'pass',
            render: (text, record) => (
                <span>{record.pass ? '通过' : '不通过'}</span>
            )
        }, {
            title: '回复给(谁)',
            dataIndex: 'reply',
            width: 250,
            render: (text, record) => (<span>
                <span className="pale-red ">作者：</span>
                {record.reply && record.reply.nick_name}
                <br />
                <span className="pale-red ">内容：</span>
                {record.reply && record.reply.content}
                <br />
                <span className="pale-red ">创建时间：</span>
                {record.reply && record.reply.create_at}
            </span>)
        },
        {
            title: '操作',
            key: 'action',
            width: 76,
            render: (text, record, index) => (
                <span>
                    <a href="#" onClick={() => this.props.action.handlePass(record._id, !record.pass)} > <i className="fa fa fa-eye fa-fw"></i>{record.pass ? '已审核' : '未审核'}</a>
                    <br />
                    <a href="#" onClick={() => { this.props.action.showModal(record) }}><i className="fa fa-reply fa-fw"></i>回复</a>
                    <br />
                    <Popconfirm title="确定要删除？" onConfirm={() => this.props.action.deleteComment(record._id)} onCancel={() => { }} okText="Yes" cancelText="No">
                        <a href="#"><i className="fa fa-trash-o fa-fw"></i>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        return {
            columns: columns
        };
    },
    handleCreate() {
        const form = this.form;
        const { saveComment } = this.props.action;
        form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (err) {
                return;
            }
            saveComment(values);
            // form.resetFields();
        })
    },
    saveFormRef(form) {
        this.form = form;
    },
    componentDidMount() {
        this.props.action.loadComments();
    },
    render() {
        const { items, pagination, loading, selectedRowKeys, visible, item } = this.props.comments;
        const { handleTableChange, onSelectChange, handleCancel } = this.props.action;
        const rowSelection = {
            selectedRowKeys,
            onChange: onSelectChange,
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
                <ReplyCommentModal
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={handleCancel}
                    onCreate={this.handleCreate}
                    comment={item || {}}
                >

                </ReplyCommentModal>
                <Table
                    rowKey={(record) => (record._id)}
                    rowSelection={rowSelection}
                    columns={this.state.columns}
                    dataSource={items}
                    loading={loading}
                    pagination={pagination}
                    onChange={handleTableChange} />
            </Content>
        );
    }

})

export default connect(
    (state) => {
        console.log(state.categories);
        return { comments: state.comments };
    },
    (dispatch) => ({
        action: bindActionCreators(commentActions, dispatch)
    })
)(content);
