import React, { useState, useEffect } from 'react';
import axios from '@blog/client/admin/axios';
import queryString from 'query-string';
import { parseTime } from '@blog/client/libs/time';
import Clipboard from 'clipboard';
import Link from 'next/link';
import { InboxOutlined } from '@ant-design/icons';
import { Form, Table, Button, Popconfirm, message, Upload, Modal, Input } from 'antd';
import config from '@blog/client/admin/configs/default.config';
import { useRouter } from 'next/router';
import { PanelDiv } from '@blog/client/admin/styles';
import {
    CloudUploadOutlined,
    PlusOutlined,
    CopyFilled,
    DeleteFilled,
    FolderFilled,
    PictureFilled,
    FileFilled,
} from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';

export default () => {
    const [state, setState] = useState({
        files: [],
        visible: false,
        pagination: {
            current: 1,
            total: 0,
        },
        selectedRowKeys: [],
        loading: false,
        clipboard: null,
        isShowNewFolderDialog: false,
        folderName: '',
        delConfirmVisible: false,
    });
    const router = useRouter();

    const fetchData = (page = 1, limit = 10) => {
        setState(data => ({
            ...data,
            loading: true,
        }));
        const { folderId } = router.query;
        const query = {
            limit,
            page,
            parentId: folderId,
        };
        return axios.get('/files?' + queryString.stringify(query)).then(res => {
            const pagination = { ...state.pagination };
            pagination.total = res.data.totalCount;
            setState(data => ({
                ...data,
                files: res.data.items,
                loading: false,
                pagination,
            }));
        });
    };
    const deleteFile = _id => {
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
            .then(res => {
                if (res && res.data && res.data.ok === 1 && res.data.deletedCount > 0) {
                    message.success('删除文件成功！');
                    setState(data => ({
                        ...data,
                        selectedRowKeys: [],
                    }));
                    return fetchData();
                }
                return message.error('删除文件失败，请重新尝试。');
            });
    };
    const fetchFolderName = () => {
        const { folderId } = router.query;
        const _id = folderId;
        if (!_id) {
            return;
        }
        return axios.get('/files/getFolderName/' + _id).then(res => {
            setState(data => ({
                ...data,
                folderName: res.data.originalName,
            }));
        });
    };
    const createFolder = name => {
        return axios
            .post('/files/createFolder', {
                name,
            })
            .then(() => {
                message.success('创建文件夹成功！');
                fetchData();
                setState(data => ({
                    ...data,
                    isShowNewFolderDialog: false,
                }));
            });
    };
    const handleOk = () => {
        return fetchData().then(() => {
            setState(data => ({
                ...data,
                visible: false,
            }));
        });
    };
    const handleNewFloderOk = data => {
        createFolder(data.name);
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
    const getTableColums = () => {
        return [
            {
                title: '原始文件名',
                dataIndex: 'originalName',
                render: (text, record) => {
                    return record.isdir ? (
                        <Link href={'/admin/code/static-files/' + record._id} passHref={true}>
                            <a>
                                <FolderFilled style={{ marginRight: '4px' }} />
                                {record.originalName}
                            </a>
                        </Link>
                    ) : record.category === 3 ? (
                        <span>
                            <PictureFilled style={{ marginRight: '4px' }} />
                            {record.originalName}
                        </span>
                    ) : (
                        <span>
                            <FileFilled style={{ marginRight: '4px' }} />
                            {record.originalName}
                        </span>
                    );
                },
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                width: 160,
                render: (text, record) => parseTime(record.createdAt, 'YYYY-MM-DD hh:mm'),
            },
            {
                title: '文件类型',
                dataIndex: 'mimetype',
                width: 160,
                render: (text, record) => {
                    return record.mimetype ? record.mimetype : '-';
                },
            },
            {
                title: '文件大小',
                dataIndex: 'size',
                width: 100,
                render: (text, record) => {
                    return record.size ? (record.size / 1024).toFixed(1) + 'k' : '-';
                },
            },
            {
                title: '操作',
                key: 'operation',
                width: 190,
                render: (text, record) => (
                    <div>
                        {!record.isdir && (
                            <Button
                                type="primary"
                                size="small"
                                title="复制"
                                data-clipboard-text={record.filePath + record.fileName}
                                className="btnCopy"
                                style={{ marginRight: '5px' }}
                                icon={<CopyFilled />}
                            >
                                复制url
                            </Button>
                        )}
                        <Popconfirm
                            title="确认要删除？"
                            onConfirm={() => deleteFile(record._id)}
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
    useEffect(() => {
        const { folderId } = router.query;
        if (folderId) {
            fetchData();
            fetchFolderName();
        }
        const c = new Clipboard('.btnCopy');
        setState(data => ({
            ...data,
            clipboard: c,
        }));
        c.on('success', function() {
            message.success('复制链接成功');
        });
        fetchData();
        fetchFolderName();
        return () => {
            if (state.clipboard) {
                state.clipboard.destroy();
            }
        };
    }, [1]);

    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange.bind(this),
    };
    const { folderId } = router.query;
    const uploadProps = {
        name: 'file',
        multiple: true,
        action: '/api/upload/static-files?parentId=' + (folderId || ''),
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
                <PanelDiv className="panel">
                    <Button
                        type="primary"
                        icon={<CloudUploadOutlined />}
                        onClick={() =>
                            setState(data => ({
                                ...data,
                                visible: true,
                            }))
                        }
                    >
                        上传
                    </Button>
                    {!folderId && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() =>
                                setState(data => ({
                                    ...data,
                                    isShowNewFolderDialog: true,
                                }))
                            }
                        >
                            新建文件夹
                        </Button>
                    )}
                    <Popconfirm
                        title="确认要删除？"
                        placement="right"
                        visible={state.delConfirmVisible}
                        onVisibleChange={() => {
                            if (state.selectedRowKeys.length <= 0) {
                                message.info('请选择要删除的文件');
                                return;
                            }
                            setState(data => ({
                                ...data,
                                delConfirmVisible: !state.delConfirmVisible,
                            }));
                        }}
                        onConfirm={() => batchDeleteFile()}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="danger" icon={<DeleteFilled />}>
                            批量删除
                        </Button>
                    </Popconfirm>
                    {folderId && (
                        <>
                            <span style={{ marginLeft: '20px' }}>当前目录为：{state.folderName}</span>
                            <Link href="/admin/code/static-files">
                                <a
                                    style={{
                                        marginLeft: '10px',
                                        color: '#fff',
                                        backgroundColor: '#1890ff',
                                        padding: '3px 8px',
                                        borderRadius: '2px',
                                    }}
                                >
                                    返回上一级
                                </a>
                            </Link>
                        </>
                    )}
                </PanelDiv>
                <Modal
                    title="上传文件"
                    visible={state.visible}
                    onOk={() => handleOk()}
                    onCancel={() =>
                        setState(data => ({
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
                <Modal
                    title="新建文件夹"
                    visible={state.isShowNewFolderDialog}
                    onCancel={() =>
                        setState(data => ({
                            ...data,
                            isShowNewFolderDialog: false,
                        }))
                    }
                    footer={null}
                >
                    <Form onFinish={handleNewFloderOk}>
                        <Form.Item
                            name="name"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 10 }}
                            label="文件夹名称："
                            rules={[
                                {
                                    required: true,
                                    message: '文件夹名称长度要在1-25个字符之间！',
                                    min: 1,
                                    max: 25,
                                },
                            ]}
                        >
                            <Input type="text" width="100%" />
                        </Form.Item>
                        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 10 }} label="操作：">
                            <Button type="primary" htmlType="submit">
                                新建
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <div className="table-wrapper">
                    <Table
                        rowKey={record => record._id}
                        rowSelection={rowSelection}
                        columns={getTableColums()}
                        dataSource={state.files}
                        loading={state.loading}
                        onChange={pagination => handleTableChange(pagination)}
                        pagination={{
                            showTotal: total => `共 ${total} 条数据`,
                        }}
                    />
                </div>
            </div>
        </BasicLayout>
    );
};
