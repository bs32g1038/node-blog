import React, { Component } from 'react';
import axios from '../../axios';
import queryString from 'query-string';
import { parseTime } from '../../utils/time';
import { Table, Button, Popconfirm, message } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import styles from './style.module.scss';

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedRowKeys: [],
            loading: false,
            visible: false,
        };
    }
    getTableColums() {
        return [
            {
                title: '名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                render: (text, record) => parseTime(record.createdAt),
            },
            {
                title: '文章数量',
                dataIndex: 'articleCount',
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
                            onClick={() => this.props.history.push('/content/categories/edit/' + record._id)}
                        >
                            <i className="fa fa-edit fa-fw"></i>
                            编辑
                        </Button>
                        ,
                        <Popconfirm
                            title="确认要删除？"
                            onConfirm={() => this.deleteCategory(record._id)}
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
    deleteCategory(_id) {
        axios.delete('/categories/' + _id).then(() => {
            message.success('删除分类成功');
            this.fetchData();
        });
    }
    batchDeleteCategory() {
        axios
            .delete('/categories', {
                data: { categoryIds: this.state.selectedRowKeys },
            })
            .then(res => {
                if (res && res.data && res.data.ok === 1 && res.data.deletedCount > 0) {
                    message.success('删除分类成功！');
                    this.setState({
                        selectedRowKeys: [],
                    });
                    return this.fetchData();
                }
                return message.error('删除分类失败，请重新尝试。');
            });
    }
    fetchData(page = 1, limit = 100) {
        const query = {
            limit,
            page,
        };
        axios.get('/categories?' + queryString.stringify(query)).then(res => {
            if (res.data && res.data.length > 0) {
                this.setState({
                    categories: res.data,
                    loading: false,
                });
            }
        });
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
            <PageHeaderWrapper title="文章分类列表" content="控制台----分类列表">
                <div className="main-content">
                    <div className={styles.panel}>
                        <Button type="primary" onClick={() => this.props.history.push('/content/categories/edit')}>
                            <i className="fa fa-plus-square fa-fw">&nbsp;</i>
                            添加分类
                        </Button>
                        <Popconfirm
                            title="确认要删除？"
                            placement="right"
                            visible={this.state.visible}
                            onVisibleChange={() => {
                                if (this.state.selectedRowKeys.length <= 0) {
                                    message.info('请选择要删除的分类');
                                    return;
                                }
                                this.setState({
                                    visible: !this.state.visible,
                                });
                            }}
                            onConfirm={() => this.batchDeleteCategory()}
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
                            loading={this.loading}
                            dataSource={this.state.categories}
                        />
                    </div>
                </div>
            </PageHeaderWrapper>
        );
    }
}
