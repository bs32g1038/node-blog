import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../redux/modules/article'
import { Link } from 'react-router'
import { Layout, Breadcrumb, Table, Button, Form } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;

const columns = [{
    title: "缩略图",
    key: 'img_url',
    render: (text, record) => (
        <img style={{ width: '121px', maxWidth: '100%', height: 'auto' }} src={record.img_url} alt="" />
    ),
}, {
    title: '标题',
    key: 'title',
    dataIndex: 'title',
    render: (text, record) => (<a href={'article/' + record._id} target="_blank">{text}</a>),
}, {
    title: '发布时间',
    key: 'create_at',
    dataIndex: 'create_at',
}, {
    title: '推荐',
    key: 'recommend',
    dataIndex: 'recommend',
    render: (text, record) => (
        <span>{record.is_recommend ? '是' : '否'}</span>
    )
}, {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    render: (text, record) => (
        <span>{record.state ? '已发布' : '草稿'}</span>
    )
}, {
    title: '分类',
    key: 'category',
    dataIndex: 'category',
    render: (text, record) => (
        <span>{record.category && record.category.name}</span>
    )
}, {
    title: '来源',
    key: 'from',
    dataIndex: 'from',
    render: (text, record) => (
        <span>{record.from === 1 ? '原创' : '转载'}</span>
    )
}, {
    title: '浏览',
    key: 'visit_count',
    dataIndex: 'visit_count',
}, {
    title: '评论',
    key: 'comment_count',
    dataIndex: 'comment_count',
},
{
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="#"><i className="fa fa fa-thumbs-o-up fa-fw"></i>推荐</a>
            <span className="ant-divider" />
            <Link to={'/admin/articles/' + record._id + '/edit'}><i className="fa fa-edit fa-fw"></i>修改</Link>
            <span className="ant-divider" />
            <a href="#"><i className="fa fa-trash-o fa-fw"></i>删除</a>
        </span>
    ),
}];

const content = React.createClass({
    componentDidMount() {
        this.props.action.loadArticles();
    },
    render() {
        const { loading, items, pagination, selectedRowKeys } = this.props.articles;
        const { handleTableChange, onSelectChange } = this.props.action;
        const rowSelection = {
            selectedRowKeys,
            onChange: onSelectChange,
        };
        // const hasSelected = selectedRowKeys.length > 0;
        return (
            <Content>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>文章管理</Breadcrumb.Item>
                    <Breadcrumb.Item>文章列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className='panel'>
                    <Link to={'/admin/articles/add'} className="ant-btn ant-btn-primary"><i className="fa fa-plus-square fa-fw"></i>&nbsp;&nbsp;添加文章</Link>
                    <Button type="danger"><i className="fa fa-trash-o fa-fw"></i>&nbsp;&nbsp;批量删除</Button>
                    <div className="fr">
                        <Form inline onSubmit={this.handleSubmit}>
                            <FormItem>
                                <input type="input" placeholder="请输入搜索关键字" className="ant-input" />
                            </FormItem>
                            <Button type="primary" htmlType="submit">搜索</Button>
                        </Form>
                    </div>
                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={items}
                    rowKey={(record) => (record._id)}
                    loading={loading}
                    pagination={pagination}
                    onChange={handleTableChange} />
            </Content>
        );
    }

})

export default connect(
    (state) => {
        console.log(state.articles);
        return { articles: state.articles };
    },
    (dispatch) => ({
        action: bindActionCreators(actions, dispatch)
    })
)(content);