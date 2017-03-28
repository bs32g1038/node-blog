import React, { Component } from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
const { Content } = Layout;
import CategoryEditModal from './CategoryEditModal';
import CategoryListItem from './CategoryListItem';
import { loadCategories, saveCategory, deleteCategory } from '../actions/CategoryAction';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            visible: false,
            category: null
        }
    }
    showModal = (category) => {
        this.setState({ category: category, visible: true })
    }
    onOk = () => {
        const { dispatch } = this.props;
        const { category } = this.state;
        this.form.validateFields((err, values) => {
            if (!err) {
                dispatch(saveCategory(category && category._id, values));
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
    deleteCategory = (id) => {
        const { dispatch } = this.props;
        dispatch(deleteCategory(id))
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadCategories());
    }
    render() {
        const { items, loading } = this.props.categories;
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Content >
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>文章管理</Breadcrumb.Item>
                    <Breadcrumb.Item>分类列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className='panel'>
                    <Button type="primary" onClick={() => (this.showModal())}><i className="fa fa-plus-square fa-fw"></i>&nbsp;&nbsp;添加分类</Button>
                    <CategoryEditModal
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.onCancel}
                        onOk={this.onOk}
                        category={this.state.category}
                    ></CategoryEditModal>
                    <Button type="danger"><i className="fa fa-trash-o fa-fw"></i>&nbsp;&nbsp;批量删除</Button>
                </div>
                <CategoryListItem
                    rowSelection={rowSelection}
                    dataSource={items}
                    loading={loading}
                    category={this.state.category}
                    editCategory={this.showModal}
                    deleteCategory={this.deleteCategory}
                ></CategoryListItem>
            </Content >
        );
    }
}

export default CategoryList