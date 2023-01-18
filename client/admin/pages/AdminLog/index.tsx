import React, { useState, useEffect, useCallback } from 'react';
import axios from '@blog/client/admin/axios';
import { parseTime } from '@blog/client/libs/time';
import Clipboard from 'clipboard';
import { Table, message } from 'antd';

import BasicLayout from '@blog/client/admin/layouts';

export default function StaticFiles() {
    const [state, setState] = useState({
        files: [],
        visible: false,
        pagination: {
            current: 1,
            total: 0,
            showTotal: (total) => `共 ${total} 条数据`,
        },
        selectedRowKeys: [],
        loading: false,
        clipboard: null,
        delConfirmVisible: false,
    });
    const fetchData = useCallback(
        async (page = 1, limit = 10) => {
            setState((data) => ({
                ...data,
                loading: true,
            }));
            const query = {
                limit,
                page,
            };
            const res = await axios.get('/admin-logs', {
                params: query,
            });
            const pagination = { ...state.pagination };
            pagination.total = res.data.totalCount;
            setState((data_1) => ({
                ...data_1,
                files: res.data.items,
                loading: false,
                pagination,
            }));
        },
        [state.pagination]
    );
    const handleTableChange = (pagination) => {
        const pager = { ...state.pagination };
        pager.current = pagination.current;
        setState((data) => ({
            ...data,
            pagination: pager,
        }));
        fetchData(pagination.current, pagination.pageSize);
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
        if (!state.clipboard) {
            const c = new Clipboard('.btnCopy');
            setState((data) => ({
                ...data,
                clipboard: c,
            }));
            c.on('success', function () {
                message.success('复制链接成功');
            });
            fetchData();
        }
        return () => {
            if (state.clipboard) {
                state.clipboard.destroy();
            }
        };
    }, [fetchData, state.clipboard]);
    return (
        <BasicLayout>
            <div className="main-content">
                <div className="table-wrapper">
                    <Table
                        rowKey={(record) => record._id}
                        columns={getTableColums()}
                        dataSource={state.files}
                        loading={state.loading}
                        onChange={(pagination) => handleTableChange(pagination)}
                        pagination={state.pagination}
                    />
                </div>
            </div>
        </BasicLayout>
    );
}
