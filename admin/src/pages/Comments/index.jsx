import React, { Component } from 'react';
import axios from '../../axios';
import queryString from 'query-string';
import { parseTime } from '../../utils/time';
import { Table, Button, Popconfirm, message } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        };
    }
    getTableColums() {
        return [
            {
                title: '昵称',
                dataIndex: 'nickName',
                width: 90,
            },
            {
                title: 'email',
                dataIndex: 'email',
                width: 100,
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                width: 100,
                render: (text, record) => parseTime(record.createdAt),
            },
            {
                title: '内容',
                dataIndex: 'content',
            },
            {
                title: '文章标题',
                dataIndex: 'article',
                width: 120,
                render: (text, record) => record.article.title,
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
        const { location } = this.props;
        axios.delete('/comments/' + _id).then(() => {
            message.success('删除评论成功');
            this.fetchData(location);
        });
    }
    fetchData(location) {
        const q = queryString.parse(location.search);
        const query = {
            limit: 10,
            page: 1,
            ...q,
        };
        axios.get('/comments?' + queryString.stringify(query)).then(res => {
            this.setState({ comments: res.data.items });
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.location.search !== this.props.location.search) {
            this.fetchData(nextProps.location);
        }
    }
    componentDidMount() {
        this.fetchData(this.props.location);
    }
    render() {
        const expandedRowKeys = this.state.comments.map(item => item._id);
        return (
            <PageHeaderWrapper title="评论列表" content="控制台----评论列表">
                <div className="main-content">
                    <div className="panel">
                        <Button type="danger">
                            <i className="fa fa-fw fa-trash-o fa-fw">&nbsp;</i>
                            批量删除
                        </Button>
                    </div>
                    <div className="table-wrapper">
                        <Table
                            rowKey={record => record._id}
                            rowSelection={{}}
                            columns={this.getTableColums()}
                            dataSource={this.state.comments}
                            expandedRowRender={record =>
                                record.reply && (
                                    <p style={{ margin: 0 }}>
                                        <span style={{ color: 'rgb(234, 102, 102)' }}>
                                            回复给@({record.reply.nickName})
                                        </span>
                                        《{record.reply.content}》
                                    </p>
                                )
                            }
                            expandedRowKeys={expandedRowKeys}
                        />
                    </div>
                </div>
            </PageHeaderWrapper>
        );
    }
}
