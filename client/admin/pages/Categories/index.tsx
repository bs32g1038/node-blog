import React, { useEffect, useState } from 'react';
import axios from '@blog/client/admin/axios';
import { parseTime } from '@blog/client/libs/time';
import { Table, Button, Popconfirm, message, Space } from 'antd';
import Router from 'next/router';
import { PlusOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts';
import queryString from 'query-string';
import ActionCard from '@blog/client/admin/components/ActionCard';

export default function Index() {
    const [state, setState] = useState({
        categories: [],
        selectedRowKeys: [],
        visible: false,
        loading: false,
    });
    const fetchData = () => {
        setState((data) => {
            return { ...data, isResetFetch: false, loading: true };
        });
        const query = {
            page: 1,
            limit: 100,
        };
        axios.get('/categories?' + queryString.stringify(query)).then((res) => {
            setState((data) => ({
                ...data,
                categories: res.data,
                loading: false,
            }));
        });
    };
    const deleteCategory = (_id) => {
        axios.delete('/categories/' + _id).then((res) => {
            message.success(`删除分类 ${res.data.name} 成功！`);
            fetchData();
        });
    };
    const batchDeleteCategory = () => {
        axios
            .delete('/categories', {
                data: { categoryIds: state.selectedRowKeys },
            })
            .then((res) => {
                if (res && res.data && res.data.deletedCount > 0) {
                    message.success(`删除分类成功！`);
                    setState((data) => ({
                        ...data,
                        selectedRowKeys: [],
                    }));
                    return fetchData();
                }
                message.error('删除分类失败，请重新尝试。');
            });
    };
    const onSelectChange = (selectedRowKeys) => {
        setState((data) => ({
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
                        <Popconfirm title="确认要删除？" onConfirm={() => deleteCategory(record._id)}>
                            <Button danger={true} size="small" title="删除" icon={<DeleteFilled />}>
                                删除
                            </Button>
                        </Popconfirm>
                    </div>
                ),
            },
        ];
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange.bind(this),
    };
    const CTitle = (
        <Space>
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
                onConfirm={() => batchDeleteCategory()}
                onVisibleChange={() => {
                    if (state.selectedRowKeys.length <= 0) {
                        message.info('请选择要删除的分类');
                        return;
                    }
                    setState((data) => ({
                        ...data,
                        visible: !state.visible,
                    }));
                }}
            >
                <Button danger={true} icon={<DeleteFilled />}>
                    批量删除
                </Button>
            </Popconfirm>
        </Space>
    );
    return (
        <BasicLayout>
            <ActionCard title={CTitle} bodyStyle={{ padding: 0 }}>
                <Table
                    rowKey={(record: any) => record._id}
                    rowSelection={rowSelection}
                    columns={getTableColums()}
                    loading={state.loading}
                    dataSource={state.categories as any}
                />
            </ActionCard>
        </BasicLayout>
    );
}
