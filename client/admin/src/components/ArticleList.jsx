import React, { Component } from 'react';
import { Layout, Breadcrumb, Button, Form } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
import ArticleListItem from './ArticleListItem';
import { loadArticles } from '../actions/ArticleActions';
import ArticleEditModal from './ArticleEditModal';
import { loadCategories } from '../actions/CategoryAction';
import { saveArticle, loadArticle, deleteArticle } from '../actions/ArticleActions';

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            visible: false,
            article: null,
            confirmLoading: false
        };
    }
    showModal = (id) => {
        const { dispatch } = this.props;
        if (id) {
            dispatch(loadArticle(id))
        }
        dispatch(loadCategories())
        this.setState({ visible: true })
    }
    onOk = () => {
        const { dispatch, articles } = this.props;
        this.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ confirmLoading: true })
                dispatch(saveArticle(articles.item && articles.item._id, values));
                this.setState({ confirmLoading: false, visible: false })
            }
        });
    }
    onCancel = () => {
        this.setState({ visible: false })
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    onArticleListChange = (pagination) => {
        const { dispatch } = this.props;
        dispatch(loadArticles({
            per_page: pagination.pageSize,
            page: pagination.current
        }))
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    deleteArticle = (id) => {
        const { dispatch } = this.props;
        dispatch(deleteArticle(id))
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadArticles({}))
    }
    render() {
        const { items, pagination, loading, item } = this.props.articles;
        const { categories, dispatch } = this.props;
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Content>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>文章管理</Breadcrumb.Item>
                    <Breadcrumb.Item>文章列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className='panel'>
                    <Button className="ant-btn ant-btn-primary" onClick={() => (this.showModal())}><i className="fa fa-plus-square fa-fw"></i>&nbsp;&nbsp;添加文章</Button>
                    <Button type="danger"><i className="fa fa-trash-o fa-fw"></i>&nbsp;&nbsp;批量删除</Button>
                    <div className="fr">
                        <Form layout='inline' onSubmit={this.handleSubmit}>
                            <FormItem>
                                <input type="input" placeholder="请输入搜索关键字" className="ant-input" />
                            </FormItem>
                            <Button type="primary" htmlType="submit">搜索</Button>
                        </Form>
                    </div>
                </div>
                <ArticleListItem
                    rowSelection={rowSelection}
                    onChange={this.onArticleListChange}
                    loading={loading}
                    pagination={pagination}
                    dataSource={items}
                    editArticle={this.showModal}
                    deleteArticle={this.deleteArticle}
                ></ArticleListItem>
                <ArticleEditModal
                    ref={this.saveFormRef}
                    dispatch={dispatch}
                    categories={categories.items}
                    visible={this.state.visible}
                    onCancel={this.onCancel}
                    onOk={this.onOk}
                    article={item}
                ></ArticleEditModal>
            </Content>
        );
    }
}

export default ArticleList;
