import React, { useCallback, useEffect, useState } from 'react';
import { parseTime } from '@blog/client/libs/time';
import { Button, Popconfirm, message, Space } from 'antd';
import Router from 'next/router';
import { PlusOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts';
import ActionCard from '@blog/client/admin/components/ActionCard';
import { useDeleteCategoriesMutation, useDeleteCategoryMutation, useFetchCategoriesMutation } from './service';
import CTable from '@blog/client/admin/components/CTable';
import { wrapper } from '@blog/client/redux/store';

export default function Index(props) {
    wrapper.useHydration(props);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [visible, setVisible] = useState(false);
    const [fetchCategories, { data = [], isLoading }] = useFetchCategoriesMutation();
    const fetchData = useCallback(() => {
        const query = {
            page: 1,
            limit: 100,
        };
        fetchCategories(query);
    }, [fetchCategories]);
    const [_deleteCategory, { isLoading: isDeleteCategoryLoading }] = useDeleteCategoryMutation();
    const deleteCategory = (id) => {
        _deleteCategory({ id })
            .unwrap()
            .then((res) => {
                message.success(`删除分类 ${res.name} 成功！`);
                fetchData();
            });
    };
    const [deleteCategories, { isLoading: isDeleteCategoriesLoading }] = useDeleteCategoriesMutation();
    const batchDeleteCategory = () => {
        deleteCategories({ categoryIds: selectedRowKeys })
            .unwrap()
            .then((res) => {
                if (res && res.deletedCount > 0) {
                    message.success(`删除分类成功！`);
                    return fetchData();
                }
                message.error('删除分类失败，请重新尝试。');
            });
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
    }, [fetchData]);
    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
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
                open={visible}
                onConfirm={() => batchDeleteCategory()}
                onOpenChange={() => {
                    if (selectedRowKeys.length <= 0) {
                        message.info('请选择要删除的分类');
                        return;
                    }
                    setVisible(!visible);
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
                <CTable
                    rowKey={(record: any) => record._id}
                    rowSelection={rowSelection}
                    columns={getTableColums()}
                    loading={isLoading || isDeleteCategoryLoading || isDeleteCategoriesLoading}
                    dataSource={data}
                />
            </ActionCard>
        </BasicLayout>
    );
}
