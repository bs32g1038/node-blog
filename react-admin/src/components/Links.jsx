import React, { Component } from 'react';
import axios from '../utils/axios';
import queryString from 'query-string';
import { Table, Button, Popconfirm, message } from 'antd';

export default class Links extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }
    getTableColums() {
        return [
            {
                width: 100,
                title: '名称',
                dataIndex: 'name'
            }, {
                title: 'url',
                dataIndex: 'url'
            },
             {
                title: '描述',
                dataIndex: 'description'
            }, 
            {
                title: 'logo',
                dataIndex: 'logo'
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
                            onClick={() => this.props.history.push('/blog/admin/links/edit/' + record._id)}>
                            <i className="fa fa-edit fa-fw"></i>
                            编辑
                        </Button>,
                        <Popconfirm title="确认要删除？" onConfirm={() => this.deleteLink(record._id)} okText="确定" cancelText="取消">
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
    deleteLink(_id) {
        const { location } = this.props;
        axios.delete('/links/' + _id).then(() => {
            message.success("删除链接成功");
            this.fetchData(location);
        });
    }
    fetchData(location) {
        const q = queryString.parse(location.search);
        const query = {
            cid: '',
            limit: 20,
            page: 1,
            ...q
        };
        axios
            .get('/links?' + queryString.stringify(query))
            .then((res) => {
                this.setState({ links: res.data });
            });
    }
    componentDidMount() {
        this.fetchData(this.props.location);
    }
    render() {
        return (
            <div className="main-content">
                <div className="manager-tip">
                    <i className="fa fa-edit fa-fw"></i><strong>控制台----友情链接管理</strong>
                </div>
                <div className="panel">
                    <Button
                        type="primary"
                        onClick={() => this.props.history.push('/blog/admin/links/edit')}>
                        <i className="fa fa-plus-square fa-fw">&nbsp;</i>
                        添加链接
                    </Button>
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
                        dataSource={this.state.links}
                    />
                </div>
            </div>
        );
    }
}