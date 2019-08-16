import React, { Component } from 'react';
import axios from '../../axios';
import queryString from 'query-string';
import { parseTime } from '../../utils/time';
import { Table, Button, Popconfirm, message } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';

export default class Demos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            demos: [],
            pagination: {},
            selectedRowKeys: [],
            loading: false,
            visible: false,
        };
    }
    getTableColums() {
        return [
            {
                title: '名称',
                dataIndex: 'title',
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                render: (text, record) => parseTime(record.createdAt),
            },
            {
                title: '操作',
                key: 'operation',
                width: 300,
                render: (text, record) => (
                    <div>
                        <Button
                            type="primary"
                            size="small"
                            title="编辑"
                            onClick={() => this.props.history.push('/demos/edit/' + record._id)}
                        >
                            <i className="fa fa-edit fa-fw"></i>
                            编辑
                        </Button>
                        ,
                        <Button
                            target="_blank"
                            type="primary"
                            style={{ backgroundColor: 'rgb(94, 181, 96)', border: '1px solid rgb(94, 181, 96)' }}
                            size="small"
                            title="预览"
                            href={'/demos/' + record._id}
                        >
                            <i className="fa fa-location-arrow fa-fw"></i>
                            预览
                        </Button>
                        ,
                        <Popconfirm
                            title="确认要删除？"
                            onConfirm={() => this.deleteDemo(record._id)}
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
    deleteDemo(_id) {
        axios.delete('/demos/' + _id).then(() => {
            message.success('删除demo成功');
            this.fetchData();
        });
    }
    batchDeleteDemo() {
        axios
            .delete('/demos', {
                data: { demoIds: this.state.selectedRowKeys },
            })
            .then(res => {
                if (res && res.data && res.data.ok === 1 && res.data.deletedCount > 0) {
                    message.success('删除demo成功！');
                    this.setState({
                        selectedRowKeys: [],
                    });
                    return this.fetchData();
                }
                return message.error('删除demo失败，请重新尝试。');
            });
    }
    fetchData(page = 1, limit = 10) {
        this.setState({
            loading: true,
        });
        const query = {
            limit,
            page,
        };
        axios.get('/demos?' + queryString.stringify(query)).then(res => {
            const pagination = { ...this.state.pagination };
            pagination.total = res.data.totalCount;
            this.setState({
                demos: res.data.items,
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
        return (
            <PageHeaderWrapper title="demo列表" content="控制台----demo列表">
                <div className="main-content">
                    <div className="panel">
                        <Button type="primary" onClick={() => this.props.history.push('/code/demos/edit')}>
                            <i className="fa fa-plus-square fa-fw">&nbsp;</i>
                            添加Demo
                        </Button>
                        <Popconfirm
                            title="确认要删除？"
                            placement="right"
                            visible={this.state.visible}
                            onVisibleChange={() => {
                                if (this.state.selectedRowKeys.length <= 0) {
                                    message.info('请选择要删除的demo');
                                    return;
                                }
                                this.setState({
                                    visible: !this.state.visible,
                                });
                            }}
                            onConfirm={() => this.batchDeleteDemo()}
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
                            dataSource={this.state.demos}
                            loading={this.state.loading}
                            onChange={pagination => this.handleTableChange(pagination)}
                            pagination={{
                                showTotal: total => `共 ${total} 条数据`,
                            }}
                        />
                    </div>
                </div>
            </PageHeaderWrapper>
        );
    }
}
