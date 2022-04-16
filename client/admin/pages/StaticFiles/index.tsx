import React, { useState, useEffect, useCallback } from 'react';
import axios from '@blog/client/admin/axios';
import queryString from 'query-string';
import { parseTime } from '@blog/client/libs/time';
import Clipboard from 'clipboard';
import { InboxOutlined } from '@ant-design/icons';
import { Table, Button, Popconfirm, message, Upload, Modal } from 'antd';
import config from '@blog/client/configs/admin.default.config';
import style from '@blog/client/admin/styles/index.module.scss';
import {
    CloudUploadOutlined,
    CopyFilled,
    DeleteFilled,
    PictureFilled,
    FileFilled,
    VideoCameraOutlined,
} from '@ant-design/icons';
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
            const res = await axios.get('/files?' + queryString.stringify(query));
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
    const deleteFile = (_id) => {
        axios.delete('/files/' + _id).then(() => {
            message.success('删除文件成功');
            fetchData();
        });
    };
    const batchDeleteFile = () => {
        axios
            .delete('/files', {
                data: { fileIds: state.selectedRowKeys },
            })
            .then((res) => {
                if (res && res.data && res.data.deletedCount > 0) {
                    message.success('删除文件成功！');
                    setState((data) => ({
                        ...data,
                        selectedRowKeys: [],
                    }));
                    return fetchData();
                }
                return message.error('删除文件失败，请重新尝试。');
            });
    };
    const handleOk = () => {
        return fetchData().then(() => {
            setState((data) => ({
                ...data,
                visible: false,
            }));
        });
    };
    const handleTableChange = (pagination) => {
        const pager = { ...state.pagination };
        pager.current = pagination.current;
        setState((data) => ({
            ...data,
            pagination: pager,
        }));
        fetchData(pagination.current, pagination.pageSize);
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
                title: '文件名',
                dataIndex: 'name',
                render: (text, record) => {
                    if (record.type === 'image') {
                        return (
                            <span>
                                <PictureFilled style={{ marginRight: '4px' }} />
                                {record.name}
                            </span>
                        );
                    }
                    if (record.type === 'video') {
                        return (
                            <span>
                                <VideoCameraOutlined style={{ marginRight: '4px' }} />
                                {record.name}
                            </span>
                        );
                    }
                    return (
                        <span>
                            <FileFilled style={{ marginRight: '4px' }} />
                            {record.name}
                        </span>
                    );
                },
            },
            {
                title: '类型',
                dataIndex: 'type',
            },
            {
                title: '大小',
                dataIndex: 'size',
                width: 100,
                render: (text, record) => {
                    return record.size ? (record.size / 1024).toFixed(1) + 'k' : '-';
                },
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                width: 160,
                render: (text, record) => parseTime(record.createdAt, 'YYYY-MM-DD hh:mm'),
            },
            {
                title: '操作',
                key: 'operation',
                width: 190,
                render: (text, record) => (
                    <div>
                        {!record.isdir && (
                            <Button
                                size="small"
                                title="复制"
                                data-clipboard-text={record.url}
                                className="btnCopy"
                                style={{ marginRight: '5px' }}
                                icon={<CopyFilled />}
                            >
                                复制url
                            </Button>
                        )}
                        <Popconfirm title="确认要删除？" onConfirm={() => deleteFile(record._id)}>
                            <Button size="small" title="删除" icon={<DeleteFilled />} danger>
                                删除
                            </Button>
                        </Popconfirm>
                    </div>
                ),
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

    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange.bind(this),
    };
    const uploadProps = {
        name: 'file',
        multiple: true,
        action: '/api/files/upload',
        headers: {
            authorization: (typeof localStorage !== 'undefined' && localStorage.getItem(config.tokenKey)) || '',
        },
        onChange(info) {
            const status = info.file.status;
            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <BasicLayout>
            <div className="main-content">
                <div className={style.adminPanelDiv}>
                    <Button
                        type="primary"
                        icon={<CloudUploadOutlined />}
                        onClick={() =>
                            setState((data) => ({
                                ...data,
                                visible: true,
                            }))
                        }
                    >
                        上传
                    </Button>
                    <Popconfirm
                        title="确认要删除？"
                        placement="right"
                        visible={state.delConfirmVisible}
                        onConfirm={() => batchDeleteFile()}
                        onVisibleChange={() => {
                            if (state.selectedRowKeys.length <= 0) {
                                message.info('请选择要删除的文件');
                                return;
                            }
                            setState((data) => ({
                                ...data,
                                delConfirmVisible: !state.delConfirmVisible,
                            }));
                        }}
                    >
                        <Button danger={true} icon={<DeleteFilled />}>
                            批量删除
                        </Button>
                    </Popconfirm>
                </div>
                <Modal
                    title="上传文件"
                    visible={state.visible}
                    onOk={() => handleOk()}
                    onCancel={() =>
                        setState((data) => ({
                            ...data,
                            visible: false,
                        }))
                    }
                >
                    <Upload.Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Upload.Dragger>
                </Modal>
                <div className="table-wrapper">
                    <Table
                        rowKey={(record) => record._id}
                        rowSelection={rowSelection}
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
