import React, { useState } from 'react';
import axios from '@blog/client/admin/axios';
import { parseTime } from '@blog/client/libs/time';
import { Table, Button, Popconfirm, message } from 'antd';
import PageHeaderWrapper from '@blog/client/admin/components/PageHeaderWrapper';
import Router from 'next/router';
import { PanelDiv } from '@blog/client/admin/styles';
import { PlusOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import useRequest from '../../hooks/useRequest';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';

export default () => {
    const [state, setState] = useState({
        categories: [],
        selectedRowKeys: [],
        loading: false,
        visible: false,
    });
    const { data: categories, mutate } = useRequest<{ categories: any[] }>({
        url: '/categories',
        params: { page: 1, limit: 100 },
    });
    const deleteCategory = _id => {
        axios.delete('/categories/' + _id).then(res => {
            message.success(`删除分类 ${res.data.name} 成功！`);
            mutate();
        });
    };
    const batchDeleteCategory = () => {
        axios
            .delete('/categories', {
                data: { categoryIds: state.selectedRowKeys },
            })
            .then(res => {
                if (res && res.data && res.data.ok === 1 && res.data.deletedCount > 0) {
                    message.success(`删除分类成功！`);
                    setState(data => ({
                        ...data,
                        selectedRowKeys: [],
                    }));
                    mutate();
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
                            icon={<EditFilled />}
                            onClick={() => Router.push('/admin/content/categories/edit/' + record._id)}
                        >
                            编辑
                        </Button>
                        ,
                        <Popconfirm
                            title="确认要删除？"
                            onConfirm={() => deleteCategory(record._id)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type="danger" size="small" title="删除" icon={<DeleteFilled />}>
                                删除
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
        <BasicLayout>
            <div className="main-content">
                <PanelDiv style={{ marginBottom: '20px' }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => Router.push('/admin/content/categories/edit')}
                    >
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
                        <Button type="danger" icon={<DeleteFilled />}>
                            批量删除
                        </Button>
                    </Popconfirm>
                </PanelDiv>
                <div className="table-wrapper">
                    <Table
                        rowKey={(record: any) => record._id}
                        rowSelection={rowSelection}
                        columns={getTableColums()}
                        loading={!categories}
                        dataSource={categories as any}
                    />
                </div>
            </div>
        </BasicLayout>
    );
};
