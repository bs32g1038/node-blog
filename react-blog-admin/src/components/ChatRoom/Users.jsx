import React, { Component } from 'react';
import axios from '../../utils/axios';
import queryString from 'query-string';
import { parseTime } from '../../utils/time';
import { Table, Button, Popconfirm, message } from 'antd';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }
    getTableColums() {
        return [
            {
                title: '头像',
                dataIndex: 'avatar',
                render: (text, record) => (
                    <a href="#" className="thumbnail">
                        <img src={record.avatar} alt="冷夜流星博客" width="100" height="60" />
                    </a>
                )
            },
            {
                title: '账号',
                dataIndex: 'account'
            },
            {
                title: '昵称',
                dataIndex: 'nickName'
            }, {
                title: '创建时间',
                dataIndex: 'createdAt',
                render: (text, record) => (parseTime(record.createdAt))
            }, {
                title: '个人描述',
                dataIndex: 'description'
            }, {
                title: '操作',
                key: 'operation',
                width: 180,
                render: (text, record) => (
                    <div>
                        <Popconfirm title="确认要删除？" onConfirm={() => this.deleteCategory(record._id)} okText="确定" cancelText="取消">
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
    deleteCategory(_id) {
        const { location } = this.props;
        axios.delete('/chatroom/users/' + _id).then(() => {
            message.success("删除房间成功");
            this.fetchData(location);
        });
    }
    fetchData(location) {
        const q = queryString.parse(location.search);
        const query = {
            limit: 10,
            page: 1,
            ...q
        };
        axios
            .get('/chatroom/users?' + queryString.stringify(query))
            .then((res) => {
                this.setState({ categories: res.data });
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
                    <i className="fa fa-edit fa-fw"></i><strong>控制台----房间管理</strong>
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
                        dataSource={this.state.categories}
                    />
                </div>
            </div>
        );
    }
}