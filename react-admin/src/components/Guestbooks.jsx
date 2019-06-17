import React, { Component } from 'react';
import axios from '../utils/axios';
import queryString from 'query-string';
import { parseTime } from '../utils/time';
import { Table, Button, Popconfirm, message } from 'antd';

export default class Guestbooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guestbooks: []
        };
    }
    getTableColums() {
        return [
            {
                title: '昵称',
                dataIndex: 'nickName',
                width: 100
            }, {
                title: 'email',
                dataIndex: 'email',
                width: 130
            }, {
                title: '位置',
                dataIndex: 'location',
                width: 130,
                render: (text, record) => (record.location || '来自远方的客人')
            }, {
                title: '创建时间',
                dataIndex: 'createdAt',
                width: 130,
                render: (text, record) => (parseTime(record.createdAt))
            }, {
                title: '内容',
                dataIndex: 'content'
            }, {
                title: '操作',
                key: 'operation',
                width: 160,
                render: (text, record) => (
                    <div>
                        <Button
                            type="primary"
                            size="small"
                            title="编辑"
                            onClick={() => this.props.history.push('/blog/admin/guestbooks/reply/' + record._id)}>
                            <i className="fa fa-edit fa-fw"></i>
                            回复
                        </Button>,
                        <Popconfirm title="确认要删除？" onConfirm={() => this.deleteGuestbook(record._id)} okText="确定" cancelText="取消">
                            <Button
                                type="danger"
                                size="small"
                                title="删除">
                                <i className="fa fa-trash-o fa-fw"></i>删除
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }
        ];
    }
    deleteGuestbook(_id) {
        const { location } = this.props;
        axios.delete('/guestbooks/' + _id).then(() => {
            message.success("删除留言成功");
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
            .get('/guestbooks?' + queryString.stringify(query))
            .then((res) => {
                this.setState({ guestbooks: res.data });
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
        const expandedRowKeys = this.state.guestbooks.map((item) => item._id);
        return (
            <div className="main-content">
                <div className="manager-tip">
                    <i className="fa fa-edit fa-fw"></i><strong>控制台----留言管理</strong>
                </div>
                <div className="panel">
                    <Button
                        type="danger">
                        <i className="fa fa-fw fa-trash-o fa-fw">&nbsp;</i>
                        批量删除
                    </Button>
                </div>
                <div className="table-wrapper">
                    <Table
                        rowKey={record => record._id}
                        rowSelection={{}}
                        columns={this.getTableColums()}
                        dataSource={this.state.guestbooks}
                        expandedRowRender={record => <p style={{ margin: 0 }}><span style={{ color: 'rgb(234, 102, 102)' }}>博主回复：</span>{record.replyContent || '暂无回复'}</p>}
                        expandedRowKeys={expandedRowKeys}
                    />
                </div>
            </div>
        );
    }
}