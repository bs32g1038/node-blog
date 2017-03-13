import React from 'react';
import { Layout, Breadcrumb, Table, Button, notification, Popconfirm } from 'antd';
const { Content } = Layout;
import axios from '../../utils/axios.js';
import AddCategoryModal from './AddCategoryModal';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as categoryActions from '../../redux/modules/category'
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
                    <Popconfirm title="确定要删除？" onConfirm={() => this.props.action.deleteCategory(record._id)} onCancel={() => { }} okText="Yes" cancelText="No">
                        <a href="#"><i className="fa fa-trash-o fa-fw"></i>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        return {
            selectedRowKeys: [],  // Check here to configure the default column
            loading: false,
            data: [],
            columns: columns,
            categoryId: '',
            categoryName: '',
            categoryAlias: ''
        };
    },
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    },
    /**
     * 提交模式对话框中的表单数据 
     * 
     */
    handleCreate() {
        const form = this.form;
        const { saveCategory, handleCancel } = this.props.action;
        console.log(this.props)
        form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (err) {
                return;
            }
            let id = values.id;
            saveCategory(id, values);
            return handleCancel();
        });
    },
    saveFormRef(form) {
        this.form = form;
    },
    componentDidMount() {
        this.props.action.loadCategories();
    },
    render() {
        const { loading, selectedRowKeys } = this.state;
        const { items, visible } = this.props.categories;
        const { showModal, handleCancel } = this.props.action;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Content>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>文章管理</Breadcrumb.Item>
                    <Breadcrumb.Item>分类列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className='panel'>
                    <Button type="primary" onClick={() => (showModal())}><i className="fa fa-plus-square fa-fw"></i>&nbsp;&nbsp;添加分类</Button>
                    <AddCategoryModal
                        ref={this.saveFormRef}
                        visible={visible}
                        onCancel={handleCancel}
                        onCreate={this.handleCreate}
                        categoryId={this.state.categoryId}
                        categoryName={this.state.categoryName}
                        categoryAlias={this.state.categoryAlias}
                    ></AddCategoryModal>
                    <Button type="danger"><i className="fa fa-trash-o fa-fw"></i>&nbsp;&nbsp;批量删除</Button>
                </div>
                <Table
                    rowKey={(record) => (record._id)}
                    pagination={false}
                    rowSelection={rowSelection}
                    columns={this.state.columns}
                    dataSource={items}
                    loading={loading} />
            </Content >
        );
    }

})

export default connect(
    (state) => {
        console.log(state.categories);
        return { categories: state.categories };
    },
    (dispatch) => ({
        action: bindActionCreators(categoryActions, dispatch)
    })
)(content);