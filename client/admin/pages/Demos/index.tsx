import React, { useEffect, useState } from 'react';
import axios from '@blog/client/admin/axios';
import queryString from 'query-string';
import { parseTime } from '@blog/client/libs/time';
import { Table, Button, Popconfirm, message } from 'antd';
import PageHeaderWrapper from '@blog/client/admin/components/PageHeaderWrapper';
import { PanelDiv } from '@blog/client/admin/styles';
import Router from 'next/router';

export default () => {
    const [state, setState] = useState({
        demos: [],
        pagination: { current: 1, total: 0 },
        selectedRowKeys: [],
        loading: false,
        visible: false,
    });
    const fetchData = (page = 1, limit = 10) => {
        setState(data => ({
            ...data,
            loading: true,
        }));
        const query = {
            limit,
            page,
        };
        axios.get('/demos?' + queryString.stringify(query)).then(res => {
            const pagination = { ...state.pagination };
            pagination.total = res.data.totalCount;
            setState(data => ({
                ...data,
                demos: res.data.items,
                loading: false,
                pagination,
            }));
        });
    };
    const deleteDemo = _id => {
        axios.delete('/demos/' + _id).then(() => {
            message.success('删除demo成功');
            fetchData();
        });
    };
    const batchDeleteDemo = () => {
        axios
            .delete('/demos', {
                data: { demoIds: state.selectedRowKeys },
            })
            .then(res => {
                if (res && res.data && res.data.ok === 1 && res.data.deletedCount > 0) {
                    message.success('删除demo成功！');
                    setState(data => ({
                        ...data,
                        selectedRowKeys: [],
                    }));
                    return fetchData();
                }
                return message.error('删除demo失败，请重新尝试。');
            });
    };
    const handleTableChange = pagination => {
        const pager = { ...state.pagination };
        pager.current = pagination.current;
        setState(data => ({
            ...data,
            pagination: pager,
        }));
        fetchData(pagination.current, pagination.pageSize);
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
                dataIndex: 'title',
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                render: (text, record) => parseTime(record.createdAt),
            },
            {
                title: '操作',
                key: 'operation',
                width: 300,
                render: (text, record) => (
                    <div>
                        <Button
                            type="primary"
                            size="small"
                            title="编辑"
                            onClick={() => Router.push('/admin/code/demos/edit/' + record._id)}
                        >
                            <i className="fa fa-edit fa-fw"></i>
                            编辑
                        </Button>
                        ,
                        <Button
                            target="_blank"
                            type="primary"
                            style={{ backgroundColor: 'rgb(94, 181, 96)', border: '1px solid rgb(94, 181, 96)' }}
                            size="small"
                            title="预览"
                            href={'/demos/' + record._id}
                        >
                            <i className="fa fa-location-arrow fa-fw"></i>
                            预览
                        </Button>
                        ,
                        <Popconfirm
                            title="确认要删除？"
                            onConfirm={() => deleteDemo(record._id)}
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
        <PageHeaderWrapper title="demo列表" content="控制台----demo列表">
            <div className="main-content">
                <PanelDiv className="panel">
                    <Button type="primary" onClick={() => Router.push('/admin/code/demos/edit')}>
                        <i className="fa fa-plus-square fa-fw">&nbsp;</i>
                        添加Demo
                    </Button>
                    <Popconfirm
                        title="确认要删除？"
                        placement="right"
                        visible={state.visible}
                        onVisibleChange={() => {
                            if (state.selectedRowKeys.length <= 0) {
                                message.info('请选择要删除的demo');
                                return;
                            }
                            setState(data => ({
                                ...data,
                                visible: !state.visible,
                            }));
                        }}
                        onConfirm={() => batchDeleteDemo()}
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
                        rowKey={record => record._id}
                        rowSelection={rowSelection}
                        columns={getTableColums()}
                        dataSource={state.demos}
                        loading={state.loading}
                        onChange={pagination => handleTableChange(pagination)}
                        pagination={{
                            showTotal: total => `共 ${total} 条数据`,
                        }}
                    />
                </div>
            </div>
        </PageHeaderWrapper>
    );
};
