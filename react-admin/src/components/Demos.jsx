import React, { Component } from 'react';
import axios from '../utils/axios';
import queryString from 'query-string';
import { parseTime } from '../utils/time';
import { Table, Button, Popconfirm, message } from 'antd';

export default class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            demos: []
        };
    }
    getTableColums() {
        return [
            {
                title: '名称',
                dataIndex: 'title'
            }, {
                title: '创建时间',
                dataIndex: 'createdAt',
                render: (text, record) => (parseTime(record.createdAt))
            }, {
                title: '操作',
                key: 'operation',
                width: 300,
                render: (text, record) => (
                    <div>
                        <Button
                            type="primary"
                            size="small"
                            title="编辑"
                            onClick={() => this.props.history.push('/blog/admin/demos/edit/' + record._id)}>
                            <i className="fa fa-edit fa-fw"></i>
                            编辑
                        </Button>,
                        <Button
                            target="_blank"
                            type="primary"
                            style={{backgroundColor: 'rgb(94, 181, 96)', border: '1px solid rgb(94, 181, 96)'}}
                            size="small"
                            title="预览"
                            href={"/demos/"+ record._id}>
                            <i className="fa fa-location-arrow fa-fw"></i>
                            预览
                        </Button>,
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
        axios.delete('/demos/' + _id).then(() => {
            message.success("删除分类成功");
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
            .get('/demos?' + queryString.stringify(query))
            .then((res) => {
                this.setState({ demos: res.data });
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
                    <i className="fa fa-edit fa-fw"></i><strong>控制台----代码demo管理</strong>
                </div>
                <div className="panel">
                    <Button
                        type="primary"
                        onClick={() => this.props.history.push('/blog/admin/demos/edit')}>
                        <i className="fa fa-plus-square fa-fw">&nbsp;</i>
                        添加Demo
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
                        dataSource={this.state.demos}
                    />
                </div>
            </div>
        );
    }
}