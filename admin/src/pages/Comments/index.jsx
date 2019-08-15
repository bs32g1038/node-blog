import React, { Component } from 'react';
import axios from '../../axios';
import queryString from 'query-string';
import { timeAgo } from '../../utils/time';
import { Table, Button, Popconfirm, message } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {},
            comments: [],
            selectedRowKeys: [],
            loading: false,
        };
    }
    getTableColums() {
        return [
            {
                title: '昵称',
                dataIndex: 'nickName',
                width: 140,
            },
            {
                title: 'email',
                dataIndex: 'email',
                width: 100,
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                width: 140,
                render: (text, record) => timeAgo(record.createdAt),
            },
            {
                title: '文章标题',
                dataIndex: 'article',
                render: (text, record) => (record.article && record.article.title) || '--',
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
                            onClick={() => this.props.history.push('/content/comments/reply/' + record._id)}
                        >
                            <i className="fa fa-edit fa-fw"></i>
                            回复
                        </Button>
                        ,
                        <Popconfirm
                            title="确认要删除？"
                            onConfirm={() => this.deleteComment(record._id)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type="danger" size="small" title="删除">
                                <i className="fa fa-trash-o fa-fw"></i>删除
                            </Button>
                        </Popconfirm>
                    </div>
                ),
            },
        ];
    }
    deleteComment(_id) {
        axios.delete('/comments/' + _id).then(() => {
            message.success('删除评论成功');
            this.fetchData();
        });
    }
    batchDeleteComment() {
        if (this.state.selectedRowKeys.length <= 0) {
            message.info('请选择要删除的评论');
            return;
        }
        axios
            .delete('/comments', {
                data: { commentIds: this.state.selectedRowKeys },
            })
            .then(res => {
                if (res && res.data && res.data.ok === 1 && res.data.deletedCount > 0) {
                    message.success('删除评论成功！');
                    return this.fetchData();
                }
                return message.error('删除评论失败，请重新尝试。');
            });
    }
    fetchData(page = 1, limit = 10) {
        this.setState({ loading: true });
        const query = {
            limit,
            page,
        };
        axios.get('/comments?' + queryString.stringify(query)).then(res => {
            const pagination = { ...this.state.pagination };
            pagination.total = res.data.totalCount;
            this.setState({
                comments: res.data.items,
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
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    }
    componentDidMount() {
        this.fetchData();
    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const expandedRowKeys = this.state.comments.map(item => item._id);
        return (
            <PageHeaderWrapper title="评论列表" content="控制台----评论列表">
                <div className="main-content">
                    <div className="panel">
                        <Popconfirm
                            title="确认要删除？"
                            placement="right"
                            onConfirm={() => this.batchDeleteComment()}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type="danger">
                                <i className="fa fa-fw fa-trash-o fa-fw">&nbsp;</i>
                                批量删除
                            </Button>
                        </Popconfirm>
                    </div>
                    <div className="table-wrapper">
                        <Table
                            rowKey={record => record._id}
                            rowSelection={rowSelection}
                            columns={this.getTableColums()}
                            loading={this.state.loading}
                            dataSource={this.state.comments}
                            onChange={pagination => this.handleTableChange(pagination)}
                            pagination={{
                                showTotal: total => `共 ${total} 条评论数据`,
                            }}
                            expandedRowRender={record => {
                                return (
                                    <React.Fragment>
                                        <p style={{ margin: '10px 0' }}>
                                            <span style={{ color: '#1890ff' }}>内容：</span>
                                            {record.content}
                                        </p>
                                        {record.reply && (
                                            <p style={{ margin: 0 }}>
                                                <span style={{ color: 'rgb(234, 102, 102)' }}>
                                                    回复给@({record.reply.nickName})
                                                </span>
                                                《{record.reply.content}》
                                            </p>
                                        )}
                                    </React.Fragment>
                                );
                            }}
                            expandedRowKeys={expandedRowKeys}
                        />
                    </div>
                </div>
            </PageHeaderWrapper>
        );
    }
}
