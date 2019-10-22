import React, { useState, useEffect } from 'react';
import axios from '@blog/client/admin/axios';
import queryString from 'query-string';
import { parseTime } from '@blog/client/libs/time';
import { Table, Button, Popconfirm, message } from 'antd';
import PageHeaderWrapper from '@blog/client/admin/components/PageHeaderWrapper';
import Router from 'next/router';
import { PanelDiv } from '@blog/client/admin/styles';

export default () => {
    const [state, setState] = useState({
        categories: [],
        selectedRowKeys: [],
        loading: false,
        visible: false,
    });
    const fetchData = (page = 1, limit = 100) => {
        setState(data => ({
            ...data,
            loading: true,
        }));
        const query = {
            limit,
            page,
        };
        axios.get('/categories?' + queryString.stringify(query)).then(res => {
            if (res.data && res.data.length > 0) {
                setState(data => ({
                    ...data,
                    categories: res.data,
                    loading: false,
                }));
            }
        });
    };
    const deleteCategory = _id => {
        axios.delete('/categories/' + _id).then(() => {
            message.success('删除分类成功');
            fetchData();
        });
    };
    const batchDeleteCategory = () => {
        axios
            .delete('/categories', {
                data: { categoryIds: state.selectedRowKeys },
            })
            .then(res => {
                if (res && res.data && res.data.ok === 1 && res.data.deletedCount > 0) {
                    message.success('删除分类成功！');
                    setState(data => ({
                        ...data,
                        selectedRowKeys: [],
                    }));
                    return fetchData();
                }
                return message.error('删除分类失败，请重新尝试。');
            });
    };
    const onSelectChange = selectedRowKeys => {
        setState(data => ({
            ...data,
            selectedRowKeys,
        }));
    };
    useEffect(() => {
        fetchData();
    }, [1]);
    const getTableColums = () => {
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
                            onClick={() => Router.push('/admin/content/categories/edit/' + record._id)}
                        >
                            <i className="fa fa-edit fa-fw"></i>
                            编辑
                        </Button>
                        ,
                        <Popconfirm
                            title="确认要删除？"
                            onConfirm={() => deleteCategory(record._id)}
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
    };
    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange.bind(this),
    };
    return (
        <PageHeaderWrapper title="文章分类列表" content="控制台----分类列表">
            <div className="main-content">
                <PanelDiv style={{ marginBottom: '20px' }}>
                    <Button type="primary" onClick={() => Router.push('/admin/content/categories/edit')}>
                        <i className="fa fa-plus-square fa-fw">&nbsp;</i>
                        添加分类
                    </Button>
                    <Popconfirm
                        title="确认要删除？"
                        placement="right"
                        visible={state.visible}
                        onVisibleChange={() => {
                            if (state.selectedRowKeys.length <= 0) {
                                message.info('请选择要删除的分类');
                                return;
                            }
                            setState(data => ({
                                ...data,
                                visible: !state.visible,
                            }));
                        }}
                        onConfirm={() => batchDeleteCategory()}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="danger">
                            <i className="fa fa-fw fa-trash-o fa-fw">&nbsp;</i>
                            批量删除
                        </Button>
                    </Popconfirm>
                </PanelDiv>
                <div className="table-wrapper">
                    <Table
                        rowKey={(record: any) => record._id}
                        rowSelection={rowSelection}
                        columns={getTableColums()}
                        loading={state.loading}
                        dataSource={state.categories}
                    />
                </div>
            </div>
        </PageHeaderWrapper>
    );
};
