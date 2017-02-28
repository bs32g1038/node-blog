import React from 'react';
import { Layout, Breadcrumb, Table, Button, notification, Popconfirm } from 'antd';
const { Content } = Layout;
import axios from '../../utils/axios.js';
import AddCategoryModal from './AddCategoryModal';
const content = React.createClass({
    getInitialState() {
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '别称',
            dataIndex: 'alias',
        }, {
            title: '权重',
            dataIndex: 'order',
        }, {
            title: '创建时间',
            dataIndex: 'create_at',
            render: text => <span style={{ color: 'green' }}>{text}</span>,
        }, {
            title: '文章数量',
            dataIndex: 'article_count'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <span>
                    {/*<Button onClick={this.showModal}></Button>*/}
                    <a onClick={() => this.showModal(record._id, record.name, record.alias)}><i className="fa fa-edit fa-fw"></i>修改</a>
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
            visible: false,
            columns: columns,
            categoryId: '',
            categoryName: '',
            categoryAlias: ''
        };
    },
    deleteConfirm(id, index) {
        let base_url = '/api/admin/categories/' + id;
        axios.delete(base_url).then((res) => {
            let oldData = this.state.data;
            oldData.splice(index, 1);
            this.setState({
                data: oldData,
                visible: false
            });
            notification.success({
                message: '操作提示',
                description: '内容已删除成功！',
            });
        });
    },
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    },
    showModal(_id, name, alias) {
        this.setState({
            visible: true,
            categoryId: _id,
            categoryName: name,
            categoryAlias: alias
        });
    },
    handleCancel() {
        this.setState({ visible: false });
    },
    /**
     * 提交模式对话框中的表单数据 
     * 
     */
    handleCreate() {
        const form = this.form;
        form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (err) {
                return;
            }
            let base_url = 'http://127.0.0.1/api/admin/categories';
            if (values.id) {
                base_url += ('/' + values.id)
                axios.put(base_url, values).then((res) => {
                    form.resetFields();
                    let oldData = this.state.data;
                    let data = oldData.map(function (item) {
                        if (item._id === values.id) {
                            item.name = res.data.name;
                            item.alias = res.data.alias;
                        }
                        return item;
                    })
                    this.setState({
                        data: data,
                        visible: false
                    });
                });
            } else {
                axios.post(base_url, values).then((res) => {
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
    saveFormRef(form) {
        this.form = form;
    },
    fetch(params) {
        this.setState({ loading: true });
        let base_url = '/api/admin/categories';
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
        console.log(this.props.router)
        const { loading, data, selectedRowKeys } = this.state;
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
                    <Breadcrumb.Item>分类列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className='panel'>
                    <Button type="primary" onClick={() => (this.showModal())}><i className="fa fa-plus-square fa-fw"></i>&nbsp;&nbsp;添加分类</Button>
                    <AddCategoryModal
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        categoryId={this.state.categoryId}
                        categoryName={this.state.categoryName}
                        categoryAlias={this.state.categoryAlias}
                    ></AddCategoryModal>
                    <Button type="danger"><i className="fa fa-trash-o fa-fw"></i>&nbsp;&nbsp;批量删除</Button>
                </div>
                <Table pagination={false} rowSelection={rowSelection} columns={this.state.columns} dataSource={data} loading={loading} />
            </Content >
        );
    }

})

export default content;