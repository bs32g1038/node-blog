import React from 'react';
import { Link } from 'react-router'
import { Layout, Breadcrumb, Table, Button, Form } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
import axios from '../../utils/axios.js';

const columns = [{
    title: "缩略图",
    key: 'pic',
    render: (text, record) => (
        <img style={{ width: '121px', maxWidth: '100%', height: 'auto' }} src={record.img_url} />
    ),
}, {
    title: '标题',
    dataIndex: 'title',
    render: (text, record) => (<a href={'article/' + record._id} target="_blank">{text}</a>),
}, {
    title: '发布时间',
    dataIndex: 'create_at',
}, {
    title: '推荐',
    dataIndex: 'recommend',
    render: (text, record) => (
        <span>{record.is_recommend ? '是' : '否'}</span>
    )
}, {
    title: '状态',
    dataIndex: 'state',
    render: (text, record) => (
        <span>{record.state ? '已发布' : '草稿'}</span>
    )
}, {
    title: '分类',
    dataIndex: 'category',
    render: (text, record) => (
        <span>{record.category && record.category.name}</span>
    )
}, {
    title: '来源',
    dataIndex: 'from',
    render: (text, record) => (
        <span>{record.from === 1 ? '原创' : '转载'}</span>
    )
}, {
    title: '浏览',
    dataIndex: 'visit_count',
}, {
    title: '评论',
    dataIndex: 'comment_count',
},
{
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="#"><i className="fa fa fa-thumbs-o-up fa-fw"></i>推荐</a>
            <span className="ant-divider" />
            <Link to={'admin/article/' + record._id + '/edit'}><i className="fa fa-edit fa-fw"></i>修改</Link>
            <span className="ant-divider" />
            <a href="#"><i className="fa fa-trash-o fa-fw"></i>删除</a>
        </span>
    ),
}];

const content = React.createClass({
    getInitialState() {
        return {
            selectedRowKeys: [],  // Check here to configure the default column
            loading: false,
            data: [],
            pagination: {}
        };
    },
    start() {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
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
        let base_url = '/api/admin/articles';
        if (params) {
            base_url += ('?page=' + params.page + '&per_page=' + params.per_page);
        }
        var pagination = this.state.pagination;
        axios.get(base_url).then((res) => {
            console.log(res.data)
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
                    <Breadcrumb.Item>文章列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className='panel'>
                    <Link to={'admin/article/add'} className="ant-btn ant-btn-primary"><i className="fa fa-plus-square fa-fw"></i>&nbsp;&nbsp;添加文章</Link>
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
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data}
                    loading={loading}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange} />
            </Content>
        );
    }

})

export default content;