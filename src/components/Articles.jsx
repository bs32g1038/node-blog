import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../utils/axios';
import queryString from 'query-string';
import { parseTime } from '../utils/time';
import { Table, Button, Popconfirm, message, Input, Row, Col } from 'antd';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            pagination: {},
            loading: false,
        };
    }
    getTableColums() {
        return [
            {
                title: '缩略图',
                dataIndex: 'screenshot',
                render: (text, record) => (
                    <a href="#" className="thumbnail">
                        <img src={record.screenshot} alt="冷夜流星博客" width="100" height="60" />
                    </a>
                )
            },
            { title: '文章标题', dataIndex: 'title', key: '2' },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                render: (text, record) => (parseTime(record.createdAt))
            },
            {
                title: '分类', dataIndex: 'category',
                render: (text, record) => (record.category ? record.category.name : "未分类")
            },
            { title: '浏览次数', dataIndex: 'viewsCount' },
            { title: '评论数', dataIndex: 'commentCount' },
            {
                title: '性质',
                dataIndex: 'draft',
                render: (text, record) => ("正文")
            },
            {
                title: '操作',
                key: 'operation',
                width: 180,
                render: (text, record) => (
                    <div>
                        <Button
                            type="primary"
                            size="small"
                            title="编辑"
                            onClick={() => this.props.history.push('/blog/admin/articles/edit/' + record._id)}>
                            <i className="fa fa-edit fa-fw"></i>
                            编辑
                        </Button>,
                        <Popconfirm title="确认要删除？" onConfirm={() => this.deleteArticle(record._id)} okText="确定" cancelText="取消">
                            <Button
                                type="danger"
                                size="small"
                                title="删除">
                                <i className="fa fa-trash-o fa-fw"></i>删除
                            </Button>
                        </Popconfirm>
                    </div>
                )
            },
        ];

    }
    deleteArticle(_id) {
        const { location } = this.props;
        axios.delete('/articles/' + _id).then(() => {
            message.success('删除文章成功！');
            this.fetchData(location);
        });
    }
    fetchData(location) {
        const q = queryString.parse(location.search);
        const query = {
            cid: '',
            limit: 10,
            page: 1,
            ...q
        };
        axios
            .get('/articles?' + queryString.stringify(query))
            .then((res) => {
                this.setState({ articles: res.data });
            });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.location.search != this.props.location.search) {
            this.fetchData(nextProps.location);
        }
    }
    componentDidMount() {
        this.fetchData(this.props.location);
    }
    render() {
        return (
            <div className="main-content">
                <div className="manager-tip">
                    <i className="fa fa-edit fa-fw"></i><strong>控制台----文章管理</strong>
                </div>
                <div className="panel">
                    <Row>
                        <Col span={6} >
                            <Button
                                type="primary"
                                onClick={() => this.props.history.push('/blog/admin/articles/edit')}>
                                <i className="fa fa-plus-square fa-fw">&nbsp;</i>
                                添加文档
                            </Button>
                            <Button
                                type="danger">
                                <i className="fa fa-fw fa-trash-o fa-fw">&nbsp;</i>
                                批量删除
                            </Button>
                        </Col>
                        <Col offset={18}>
                            <form action="/admin/manage/contentList" name="searchForm">
                                <div className="search-input-group">
                                    <Input
                                        type="text"
                                        name="searchKey"
                                        width="200"
                                        placeholder="请输入需要查询的关键字" />
                                    <Button
                                        type="primary">
                                        <i className="fa fa-search fa-fw"></i>搜索
                                    </Button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </div>
                <div className="table-wrapper">
                    <Table
                        rowKey={record => record._id}
                        rowSelection={{}}
                        columns={this.getTableColums()}
                        dataSource={this.state.articles}
                        // pagination={this.state.pagination}
                        // loading={this.state.loading}
                        // onChange={this.handleTableChange}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(Articles);