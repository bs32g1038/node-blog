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
        const { location } = this.props;
        axios.delete('/categories/' + _id).then(() => {
            message.success('删除分类成功');
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
        axios.get('/categories?' + queryString.stringify(query)).then(res => {
            if (res.data && res.data.length > 0) {
                this.setState({ categories: res.data });
            }
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
        const rowSelection = {
            onChange: () => {},
            getCheckboxProps: record => ({
                name: record.name,
            }),
        };
        return (
            <PageHeaderWrapper title="文章分类列表" content="控制台----分类列表">
                <div className="main-content">
                    <div className={styles.panel}>
                        <Button type="primary" onClick={() => this.props.history.push('/content/categories/edit')}>
                            <i className="fa fa-plus-square fa-fw">&nbsp;</i>
                            添加分类
                        </Button>
                        <Button type="danger">
                            <i className="fa fa-fw fa-trash-o fa-fw">&nbsp;</i>
                            批量删除
                        </Button>
                    </div>
                    <div className="table-wrapper">
                        <Table
                            rowKey={record => record._id}
                            rowSelection={rowSelection}
                            columns={this.getTableColums()}
                            dataSource={this.state.categories}
                        />
                    </div>
                </div>
            </PageHeaderWrapper>
        );
    }
}
