import React, { useState, useEffect, useCallback } from 'react';
import { parseTime } from '@blog/client/libs/time';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message, Upload, Modal, Image } from 'antd';
import config from '@blog/client/configs/admin.default.config';
import style from '@blog/client/admin/styles/index.module.scss';
import { CloudUploadOutlined, CopyFilled, DeleteFilled, FileFilled, VideoCameraOutlined } from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts';
import CTable from '../../components/CTable';
import { useDeleteFileMutation, useDeleteFilesMutation, useFetchStaticFilesMutation } from './service';
import { useFetchConfigQuery } from '@blog/client/web/api';
import { wrapper } from '@blog/client/redux/store';

export default function StaticFiles(props) {
    wrapper.useHydration(props);
    const { data: appConfig } = useFetchConfigQuery();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState({
        current: 1,
        pageSize: 10,
        searchKey: '',
    });
    const [fetchFiles, { data = { items: [], totalCount: 0 }, isLoading }] = useFetchStaticFilesMutation();
    const fetchData = useCallback(() => {
        const query = {
            page: state.current || 1,
            limit: state.pageSize || 10,
        };
        return fetchFiles(query)
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
    }, [fetchFiles, state]);
    const [_deleteFile, { isLoading: isDeleteFileLoading }] = useDeleteFileMutation();
    const deleteFile = (id) => {
        _deleteFile({ id }).then(() => {
            message.success('删除文件成功！');
            fetchData();
        });
    };
    const [deleteFiles, { isLoading: isDeleteFilesLoading }] = useDeleteFilesMutation();
    const batchDeleteFile = () => {
        deleteFiles({ fileIds: selectedRowKeys })
            .unwrap()
            .then((res) => {
                if (res && res.deletedCount > 0) {
                    message.success('删除文件成功！');
                    return fetchData();
                }
                message.error('删除文件失败，请重新尝试。');
            });
    };
    const handleOk = () => {
        return fetchData().then(() => {
            setVisible(false);
        });
    };
    const handleTableChange = (pagination) => {
        setState((data) => ({
            ...data,
            current: pagination.current,
        }));
        fetchData();
    };
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange.bind(this),
    };
    const getTableColums = () => {
        return [
            {
                title: '文件',
                dataIndex: 'name',
                render: (text, record) => {
                    if (record.type === 'image') {
                        return (
                            <Image width={150} height={100} src={record.url} alt="" style={{ objectFit: 'contain' }} />
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
                title: '文件名',
                dataIndex: 'originName',
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
                render: (text, record) => parseTime(record.createdAt, 'YYYY-MM-DD hh:mm'),
            },
            {
                title: '操作',
                key: 'operation',
                width: 190,
                render: (text, record) => (
                    <div>
                        {!record.isdir && (
                            <CopyToClipboard
                                text={appConfig.siteDomain + '/' + record.url}
                                onCopy={() => {
                                    message.success('复制链接成功');
                                }}
                            >
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
                            </CopyToClipboard>
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
                    <Button type="primary" icon={<CloudUploadOutlined />} onClick={() => setVisible(true)}>
                        上传
                    </Button>
                    <Popconfirm
                        title="确认要删除？"
                        placement="right"
                        onConfirm={() => batchDeleteFile()}
                        onOpenChange={() => {
                            if (selectedRowKeys.length <= 0) {
                                message.info('请选择要删除的文件');
                                return;
                            }
                        }}
                    >
                        <Button danger={true} icon={<DeleteFilled />}>
                            批量删除
                        </Button>
                    </Popconfirm>
                </div>
                <Modal
                    title="上传文件"
                    open={visible}
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
                    <CTable
                        rowKey={(record) => record._id}
                        rowSelection={rowSelection}
                        columns={getTableColums()}
                        dataSource={data.items}
                        loading={isLoading || isDeleteFileLoading || isDeleteFilesLoading}
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
