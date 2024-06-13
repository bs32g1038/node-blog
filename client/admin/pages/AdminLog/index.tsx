import React, { useState, useEffect, useCallback } from 'react';
import BasicLayout from '@blog/client/admin/layouts';
import { useFetchAdminLogsMutation } from './service';
import CTable from '../../components/CTable';
import { parseTime } from '@blog/client/libs/time';
import { wrapper } from '@blog/client/redux/store';
import { TablePaginationConfig } from 'antd';

export default function Index(props: any) {
    wrapper.useHydration(props);
    const [state, setState] = useState<{
        current: number;
        pageSize: number;
    }>({
        current: 1,
        pageSize: 10,
    });
    const [fetchAdminLogs, { data = { items: [], count: 0 }, isLoading }] = useFetchAdminLogsMutation();
    const fetchData = useCallback(() => {
        const query = {
            page: state.current || 1,
            limit: state.pageSize || 10,
        };
        fetchAdminLogs(query)
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
    }, [fetchAdminLogs, state]);
    const handleTableChange = (pagination: TablePaginationConfig) => {
        setState((data) => ({
            ...data,
            current: pagination.current ?? 1,
        }));
        fetchData();
    };
    const getTableColums = () => {
        return [
            {
                title: '登录时间',
                dataIndex: 'createdAt',
                width: 160,
                render: (text: string, record: any) => parseTime(record.createdAt, 'YYYY-MM-DD hh:mm'),
            },

            {
                title: '用户昵称',
                render: (text: string, record: any) => {
                    return record.user?.username ?? '-';
                },
            },
            {
                title: '登录行为',
                dataIndex: 'type',
            },
            {
                title: '登录 IP',
                dataIndex: 'ip',
            },
            {
                title: '浏览器',
                dataIndex: 'browser',
            },
            {
                title: '终端系统',
                dataIndex: 'os',
            },
        ];
    };
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <BasicLayout>
            <div className="main-content">
                <div className="table-wrapper">
                    <CTable
                        rowKey={(record) => record._id}
                        columns={getTableColums()}
                        dataSource={data.items}
                        loading={isLoading}
                        onChange={(pagination) => handleTableChange(pagination)}
                        pagination={{
                            current: state.current,
                            pageSize: state.pageSize,
                            total: data.totalCount,
                        }}
                    />
                </div>
            </div>
        </BasicLayout>
    );
}
