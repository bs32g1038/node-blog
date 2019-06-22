import React, { Component } from 'react';
import axios from '../../axios';
import queryString from 'query-string';
import { parseTime } from '../../utils/time';
import Clipboard from 'clipboard';
import { Table, Button, Popconfirm, message } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';

export default class Medias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            pagination: {},
            loading: false,
            clipboard: null
        };
    }
    getTableColums() {
        return [
            {
                title: '原始文件名',
                dataIndex: 'originalName'
            },
            {
                title: '文件名',
                dataIndex: 'fileName'
            }, {
                title: '创建时间',
                dataIndex: 'createdAt',
                width: 120,
                render: (text, record) => (parseTime(record.createdAt, 'YYYY-MM-DD'))
            }, {
                title: '文件类型',
                dataIndex: 'mimetype',
                width: 160,
            }, {
                title: '文件大小',
                dataIndex: 'size',
                width: 80,
                render: (text, record) => ((record.size / 1024).toFixed(1) + 'k')
            }, {
                title: '操作',
                key: 'operation',
                width: 200,
                render: (text, record) => (
                    <div>
                        <Button
                            type="primary"
                            size="small"
                            title="复制"
                            data-clipboard-text={record.filePath + record.fileName}
                            className="btnCopy"
                        >
                            复制url
                        </Button>,
                        <Popconfirm title="确认要删除？" onConfirm={() => this.deleteFile(record._id)} okText="确定" cancelText="取消">
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
    deleteFile(_id) {
        axios.delete('/medias/' + _id).then(() => {
            message.success("删除文件成功");
            this.fetchData();
        });
    }
    fetchData(page = 1, limit = 10) {
        this.setState({ loading: true });
        const query = {
            limit,
            page
        };
        return axios
            .get('/medias?' + queryString.stringify(query))
            .then((res) => {
                const pagination = { ...this.state.pagination };
                pagination.total = res.data.totalCount;
                this.setState({
                    files: res.data.items,
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
        const c = new Clipboard('.btnCopy');
        this.setState({
            clipboard: c
        });
        c.on('success', function (e) {
            message.success("复制链接成功");
        });
        this.fetchData();
    }
    componentWillUnmount() {
        this.state.clipboard.destroy();
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.key === 'Disabled User',
                name: record.name,
            }),
        };
        return (
            <PageHeaderWrapper
                title='媒体文件列表'
                content='控制台----媒体文件列表'
            >
                <div className="main-content">
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
                            rowSelection={rowSelection}
                            columns={this.getTableColums()}
                            dataSource={this.state.files}
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