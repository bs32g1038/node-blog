import React from 'react';
import { Link } from 'react-router'
import { Layout, Breadcrumb, Table, Button, Form, Popconfirm, notification } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
import axios from '../../utils/axios.js';
import ReplyGuestbookModal from './ReplyGuestbookModal';

const content = React.createClass({

    getInitialState() {
        const columns = [{
            title: '昵称',
            dataIndex: 'nick_name'
        }, {
            title: '创建时间',
            dataIndex: 'create_at',
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
            title: '管理员回复的内容',
            dataIndex: 'reply_content',
            width: 250
        },
        {
            title: '操作',
            key: 'action',
            width: 76,
            render: (text, record, index) => (
                <span>
                    <a href="#" onClick={() => this.handlePass(record._id, !record.pass)} > <i className="fa fa fa-eye fa-fw"></i>{record.pass ? '未审核' : '已审核'}</a>
                    <br />
                    <a href="#" onClick={() => { this.showModal(record) }}><i className="fa fa-reply fa-fw"></i>回复</a>
                    <br />
                    <Popconfirm title="确定要删除？" onConfirm={() => this.deleteConfirm(record._id, index)} onCancel={() => { }} okText="Yes" cancelText="No">
                        <a href="#"><i className="fa fa-trash-o fa-fw"></i>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        return {
            selectedRowKeys: [],  // Check here to configure the default column
            loading: false,
            data: [],
            pagination: {},
            columns: columns,
            guestbook: {}
        };
    },
    deleteConfirm(id, index) {
        let base_url = '/api/admin/comments/' + id;
        axios.delete(base_url).then((res) => {
            let oldData = this.state.data;
            oldData.splice(index, 1);
            this.setState({
                data: oldData
            });
            notification.success({
                message: '操作提示',
                description: '内容已删除成功！',
            });
        });
    },
    showModal(record) {
        this.setState({
            visible: true,
            guestbook: {
                id: record._id,
                nick_name: record.nick_name,
                content: record.content,
                reply_content: record.reply_content
            }
        });
    },
    handlePass(id, pass) {
        let base_url = '/api/admin/guestbooks/' + id + '/pass';
        axios.put(base_url, { pass: pass }).then((res) => {
            let items = this.state.data;
            let data = items.map(function (item) {
                if (item._id === id) {
                    item.pass = pass;
                }
                return item;
            })
            this.setState({
                data: data
            });
            notification.success({
                message: '操作提示',
                description: (pass ? '内容已设置为审核通过！' : '内容已设置为审核未通过'),
            });
        });

    },
    handleCancel() {
        this.setState({ visible: false });
    },
    handleReplyContent() {
        const form = this.form;
        form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (err) {
                return;
            }
            let base_url = 'http://127.0.0.1/api/admin/guestbooks/' + values.id + '/reply_content';
            axios.put(base_url, values).then((res) => {
                form.resetFields();
                let items = this.state.data;
                let data = items.map(function (item) {
                    if (item._id === values.id) {
                        item.reply_content = values.reply_content;
                    }
                    return item;
                })
                this.setState({
                    data: data,
                    visible: false
                });
            });
        })
    },
    saveFormRef(form) {
        this.form = form;
    },
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    },
    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            per_page: pagination.pageSize,
            page: pagination.current
        });
    },
    fetch(params) {
        this.setState({ loading: true });
        let base_url = '/api/admin/guestbooks';
        if (params) {
            base_url += ('?page=' + params.page + '&per_page=' + params.per_page);
        }
        var pagination = this.state.pagination;
        axios.get(base_url).then((res) => {
            pagination.total = res.data.total_count;
            this.setState({
                loading: false,
                data: res.data.items,
                pagination,
            });
        });
    },
    componentDidMount() {
        this.fetch();
    },
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
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
                <ReplyGuestbookModal
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleReplyContent}
                    guestbook={this.state.guestbook}
                >

                </ReplyGuestbookModal>
                <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data}
                    loading={loading}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange} />
            </Content>
        );
    }

})

export default content;