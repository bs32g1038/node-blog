import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import queryString from 'query-string';
import { parseTime } from '../../utils/time';
import { Table, Button, Popconfirm, message, Input, Row, Col, Tag } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import styles from './style.module.scss';

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
                    <a href={"/blog/articles/" + record._id} className="thumbnail">
                        <img src={record.screenshot} alt="冷夜流星博客" width="100" height="60" />
                    </a>
                )
            },
            { title: '文章标题', dataIndex: 'title' },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                render: (text, record) => (parseTime(record.createdAt))
            },
            {
                title: '分类', 
                dataIndex: 'category',
                width: 100,
                render: (text, record) => (record.category ? record.category.name : "未分类")
            },
            { 
                title: '浏览次数', 
                dataIndex: 'viewsCount',
                width: 90
            },
            { 
                title: '评论数', 
                dataIndex: 'commentCount',
                width: 90
            },
            {
                title: '状态',
                dataIndex: 'isDraft',
                render: (text, record) => (record.isDraft ? <Tag color="red">草稿</Tag> : <Tag color="green">已发布</Tag>)
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
                            onClick={() => this.props.history.push('/blog/admin/content/articles/edit/' + record._id)}>
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
        axios.delete('/articles/' + _id).then(() => {
            message.success('删除文章成功！');
            this.fetchData();
        });
    }
    fetchData(page = 1, limit = 10) {
        this.setState({ loading: true });
        const query = {
            limit,
            page
        };
        axios
            .get('/articles?' + queryString.stringify(query))
            .then((res) => {
                const pagination = { ...this.state.pagination };
                pagination.total = res.data.totalCount;
                this.setState({
                    articles: res.data.items,
                    loading: false,
                    pagination,
                });
            });
    }
    handleTableChange(pagination) {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetchData(pagination.current, pagination.pageSize);
    }
    componentDidMount() {
        this.fetchData();
    }
    render() {
        return (
            <PageHeaderWrapper
                title='文章列表'
                content='控制台----文章列表'
            >
                <div className="main-content">
                    <div className={styles.panel}>
                        <Row type="flex" justify="space-between" className={styles.moduleControl}>
                            <Col>
                                <Button
                                    type="primary"
                                    onClick={() => this.props.history.push('/blog/admin/content/articles/edit')}>
                                    <i className="fa fa-plus-square fa-fw">&nbsp;</i>
                                    添加文档
                                </Button>
                                <Button
                                    type="danger">
                                    <i className="fa fa-fw fa-trash-o fa-fw">&nbsp;</i>
                                    批量删除
                                </Button>
                            </Col>
                            <Col style={{ flex: '1 0 auto' }} justify="end">
                                <form action="/admin/manage/contentList" className={styles.searchForm}>
                                    <div className="search-input-group">
                                        <Row type="flex" justify="end">
                                            <Col>
                                                <Input
                                                    type="text"
                                                    name="searchKey"
                                                    placeholder="请输入需要查询的关键字" />
                                            </Col>
                                            <Col>
                                                <Button
                                                    type="primary">
                                                    <i className="fa fa-search fa-fw"></i>搜索
                                                </Button>
                                            </Col>
                                        </Row>
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
                            pagination={this.state.pagination}
                            loading={this.state.loading}
                            onChange={(pagination) => this.handleTableChange(pagination)}
                        />
                    </div>
                </div>
            </PageHeaderWrapper>
        );
    }

}

export default withRouter(Articles);