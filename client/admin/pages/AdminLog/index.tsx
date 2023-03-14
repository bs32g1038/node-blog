import React, { useState, useEffect, useCallback } from 'react';
import BasicLayout from '@blog/client/admin/layouts';
import { useFetchAdminLogsMutation } from './service';
import CTable from '../../components/CTable';
import { parseTime } from '@blog/client/libs/time';
import { wrapper } from '@blog/client/redux/store';

export default function Index(props) {
    wrapper.useHydration(props);
    const [state, setState] = useState({
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
    const handleTableChange = (pagination) => {
        setState((data) => ({
            ...data,
            current: pagination.current,
        }));
        fetchData();
    };
    const getTableColums = () => {
        return [
            {
                title: '类型',
                dataIndex: 'type',
            },
            {
                title: '数据',
                dataIndex: 'data',
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                width: 160,
                render: (text, record) => parseTime(record.createdAt, 'YYYY-MM-DD hh:mm'),
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
