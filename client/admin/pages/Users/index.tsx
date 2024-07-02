import React, { useCallback, useEffect, useState } from 'react';
import { parseTime } from '@blog/client/libs/time';
import { Button, Popconfirm, message, Space, Tag, Avatar, TablePaginationConfig } from 'antd';
import {
    DeleteFilled,
    MinusCircleOutlined,
    CheckCircleOutlined,
    ManOutlined,
    WomanOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts';
import ActionCard from '@blog/client/admin/components/ActionCard';
import {
    useDeleteUsersMutation,
    useDeleteUserMutation,
    useFetchUsersMutation,
    useUpdateStatusMutation,
} from './service';
import CTable from '@blog/client/admin/components/CTable';
import { wrapper } from '@blog/client/redux/store';

export default function Index(props: any) {
    wrapper.useHydration(props);
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState({
        current: 1,
        pageSize: 10,
    });
    const [fetchUsers, { data = { items: [], count: 0 }, isLoading }] = useFetchUsersMutation();
    const fetchData = useCallback(
        (searchKey = '') => {
            const query = {
                page: state.current || 1,
                limit: state.pageSize || 10,
                ...(searchKey ? { title: searchKey } : {}),
            };
            fetchUsers(query)
                .unwrap()
                .then((res) => {
                    if (res.items.length === 0 && state.current > 1) {
                        setState((s) => {
                            const temp = { ...s };
                            Object.assign(temp, {
                                current: temp.current - 1,
                            });
                            return temp;
                        });
                    }
                });
        },
        [state, fetchUsers]
    );
    const [_deleteUser, { isLoading: isDeleteUserLoading }] = useDeleteUserMutation();
    const deleteCategory = (id: string) => {
        _deleteUser({ id })
            .unwrap()
            .then((res) => {
                message.success(`删除用户 ${res.email} 成功！`);
                fetchData();
            });
    };
    const [deleteUsers, { isLoading: isDeleteUsersLoading }] = useDeleteUsersMutation();
    const batchDeleteCategory = () => {
        deleteUsers({ ids: selectedRowKeys })
            .unwrap()
            .then((res) => {
                if (res && res.deletedCount > 0) {
                    message.success(`删除用户成功！`);
                    return fetchData();
                }
                message.error('删除用户失败，请重新尝试。');
            });
    };
    const [updateStatusMutation, { isLoading: isUpdateStatusMutation }] = useUpdateStatusMutation();
    const getTableColums = () => {
        return [
            {
                title: '序号',
                dataIndex: 'index',
                width: 80,
                render: (_: string, record: any, index: number) => {
                    return index + (state.current - 1) * state.pageSize + 1;
                },
            },
            {
                title: '用户名',
                dataIndex: 'account',
                render: (type: string, record: any) => {
                    return (
                        <Space>
                            <Avatar src={record.avatar}></Avatar>
                            <div>{type}</div>
                        </Space>
                    );
                },
            },
            {
                title: '昵称',
                dataIndex: 'username',
            },
            {
                title: '角色',
                dataIndex: 'type',
                width: 100,
                render: (type: string) => {
                    return {
                        admin: '管理员',
                        user: '用户',
                    }[type];
                },
            },
            {
                title: '状态',
                dataIndex: 'disabled',
                width: 100,
                render: (disabled: boolean) => {
                    if (disabled) {
                        return (
                            <Tag color="default" icon={<MinusCircleOutlined />}>
                                禁用
                            </Tag>
                        );
                    }
                    return (
                        <Tag color="success" icon={<CheckCircleOutlined />}>
                            启用
                        </Tag>
                    );
                },
            },
            {
                title: '性别',
                dataIndex: 'gender',
                width: 100,
                render: (gender: number) => {
                    return {
                        0: <Tag>未知</Tag>,
                        1: (
                            <Tag color="success" icon={<ManOutlined />}>
                                男
                            </Tag>
                        ),
                        2: (
                            <Tag color="gold" icon={<WomanOutlined />}>
                                女
                            </Tag>
                        ),
                    }[gender];
                },
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                width: 200,
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                width: 160,
                render: (_text: any, record: { createdAt: string }) => parseTime(record.createdAt),
            },
            {
                title: '操作',
                key: 'operation',
                width: 180,
                render: (_text: any, record: { _id: string; disabled: boolean }) => (
                    <Space>
                        {record.disabled ? (
                            <Button
                                type="primary"
                                size="small"
                                title="启用"
                                icon={<CheckCircleOutlined />}
                                loading={isUpdateStatusMutation}
                                onClick={() => {
                                    updateStatusMutation({
                                        id: record._id,
                                        disabled: false,
                                    }).then(() => {
                                        message.success('启用账号成功');
                                        return fetchData();
                                    });
                                }}
                            >
                                启用
                            </Button>
                        ) : (
                            <Button
                                size="small"
                                title="禁用"
                                loading={isUpdateStatusMutation}
                                icon={<CloseCircleOutlined />}
                                onClick={() => {
                                    updateStatusMutation({
                                        id: record._id,
                                        disabled: true,
                                    }).then(() => {
                                        message.success('禁用账号成功');
                                        return fetchData();
                                    });
                                }}
                            >
                                禁用
                            </Button>
                        )}

                        <Popconfirm title="确认要删除？" onConfirm={() => deleteCategory(record._id)}>
                            <Button danger={true} size="small" title="删除" icon={<DeleteFilled />}>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];
    };
    const handleTableChange = (pagination: TablePaginationConfig) => {
        setState((data) => ({
            ...data,
            current: pagination.current ?? 1,
        }));
    };
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    const rowSelection = {
        selectedRowKeys,
        onChange: (value: any[]) => setSelectedRowKeys(value),
    };
    const CTitle = (
        <Popconfirm
            title="确认要删除？"
            placement="right"
            open={visible}
            onConfirm={() => batchDeleteCategory()}
            onOpenChange={() => {
                if (selectedRowKeys.length <= 0) {
                    message.info('请选择要删除的用户');
                    return;
                }
                setVisible(!visible);
            }}
        >
            <Button danger={true} icon={<DeleteFilled />}>
                批量删除
            </Button>
        </Popconfirm>
    );
    return (
        <BasicLayout>
            <ActionCard
                title={CTitle}
                styles={{
                    body: { padding: 0 },
                }}
            >
                <CTable
                    rowKey={(record: any) => record._id}
                    rowSelection={rowSelection}
                    columns={getTableColums()}
                    loading={isLoading || isDeleteUserLoading || isDeleteUsersLoading}
                    dataSource={data.items}
                    pagination={{
                        current: state.current,
                        pageSize: state.pageSize,
                        total: data.totalCount,
                    }}
                    onChange={(pagination) => handleTableChange(pagination)}
                />
            </ActionCard>
        </BasicLayout>
    );
}
