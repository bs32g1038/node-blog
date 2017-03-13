import React from 'react';
import { Link } from 'react-router'
import { Layout, Breadcrumb, Table, Button, Form, Popconfirm, notification } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
import axios from '../../utils/axios.js';
import LinkEditModal from './LinkEditModal';

const content = React.createClass({

    getInitialState() {
        const columns = [{
            title: '名称',
            dataIndex: 'name'
        }, {
            title: 'url',
            dataIndex: 'url',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <span>
                    <a href="#" onClick={() => { this.showModal(record) }}><i className="fa fa-edit fa-fw"></i>编辑</a>
                    <span className="ant-divider" />
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
            link: {}
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
            link: {
                id: record._id,
                name: record.name,
                url: record.url
            }
        });
    },
    handleSubmit() {
        const form = this.form;
        form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (err) {
                return;
            }
            let base_url = '/api/admin/links';
            if (values.id) {
                base_url += ('/' + values.id)
                axios.put(base_url, values).then((res) => {
                    form.resetFields();
                    let oldData = this.state.data;
                    let data = oldData.map(function (item) {
                        if (item._id === values.id) {
                            item.name = res.data.name;
                            item.url = res.data.url;
                        }
                        return item;
                    })
                    notification['success']({
                        message: '操作提示',
                        description: '内容已提交成功！',
                    });
                    this.setState({
                        data: data,
                        visible: false
                    });
                });
            } else {
                axios.post(base_url, values).then((res) => {
                    notification['success']({
                        message: '操作提示',
                        description: '内容已提交成功！',
                    });
                    form.resetFields();
                    let oldData = this.state.data;
                    oldData.unshift(res.data)
                    this.setState({
                        data: oldData,
                        visible: false
                    });
                });
            }
        });
    },
    handleCancel() {
        this.setState({ visible: false });
    },
    saveFormRef(form) {
        this.form = form;
    },
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    },
    fetch(params) {
        this.setState({ loading: true });
        let base_url = '/api/admin/links';
        axios.get(base_url).then((res) => {
            this.setState({
                loading: false,
                data: res.data.items
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
                    <Button type="primary" onClick={() => (this.showModal({}))}><i className="fa fa-plus-square fa-fw"></i>&nbsp;&nbsp;添加链接</Button>
                    <Button type="danger"><i className="fa fa-trash-o fa-fw"></i>&nbsp;&nbsp;批量删除</Button>
                </div>
                <LinkEditModal
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleSubmit}
                    link={this.state.link}
                >
                </LinkEditModal>
                <Table
                    rowKey={(record) => (record._id)}
                    rowSelection={rowSelection}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    loading={loading}
                    pagination={false}
                />
            </Content>
        );
    }

})

export default content;