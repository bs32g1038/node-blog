import React, { Component } from 'react';
import axios from '../../axios';
import queryString from 'query-string';
import { parseTime } from '../../utils/time';
import Clipboard from 'clipboard';
import { Link } from 'react-router-dom';
import { Table, Button, Popconfirm, message, Upload, Icon, Modal, Form, Input } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import config from '../../configs/default.config';

const FormItem = Form.Item;
const Dragger = Upload.Dragger;

class StaticFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            visible: false,
            pagination: {},
            selectedRowKeys: [],
            loading: false,
            clipboard: null,
            isShowNewFolderDialog: false,
            folderName: '',
            delConfirmVisible: false,
        };
    }
    getTableColums() {
        return [
            {
                title: '原始文件名',
                dataIndex: 'originalName',
                render: (text, record) => {
                    return record.isdir ? (
                        <Link to={'/code/static-files/' + record._id}>
                            <span>
                                <i className="fa fa-folder fa-fw"></i>
                                {record.originalName}
                            </span>
                        </Link>
                    ) : record.category === 3 ? (
                        <span>
                            <i className="fa fa-photo fa-fw"></i>
                            {record.originalName}
                        </span>
                    ) : (
                        <span>
                            <i className="fa fa-file fa-fw"></i>
                            {record.originalName}
                        </span>
                    );
                },
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                width: 200,
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
                width: 200,
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
                            >
                                复制url
                            </Button>
                        )}
                        <Popconfirm
                            title="确认要删除？"
                            onConfirm={() => this.deleteFile(record._id)}
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
    }
    deleteFile(_id) {
        axios.delete('/files/' + _id).then(() => {
            message.success('删除文件成功');
            this.fetchData();
        });
    }
    batchDeleteFile() {
        axios
            .delete('/files', {
                data: { fileIds: this.state.selectedRowKeys },
            })
            .then(res => {
                if (res && res.data && res.data.ok === 1 && res.data.deletedCount > 0) {
                    message.success('删除文件成功！');
                    this.setState({
                        selectedRowKeys: [],
                    });
                    return this.fetchData();
                }
                return message.error('删除文件失败，请重新尝试。');
            });
    }
    fetchData(page = 1, limit = 10) {
        this.setState({ loading: true });
        const query = {
            limit,
            page,
            parentId: this.props.match.params.folderId,
        };
        return axios.get('/files?' + queryString.stringify(query)).then(res => {
            const pagination = { ...this.state.pagination };
            pagination.total = res.data.totalCount;
            this.setState({
                files: res.data.items,
                loading: false,
                pagination,
            });
        });
    }
    fetchFolderName() {
        const _id = this.props.match.params.folderId;
        if (!_id) {
            return;
        }
        return axios.get('/files/getFolderName/' + _id).then(res => {
            return this.setState({
                folderName: res.data.originalName,
            });
        });
    }
    createFolder(name) {
        return axios
            .post('/files/createFolder', {
                name,
            })
            .then(() => {
                message.success('创建文件夹成功！');
                this.fetchData();
                this.setState({
                    isShowNewFolderDialog: false,
                });
            });
    }
    handleOk() {
        return this.fetchData().then(() => {
            this.setState({
                visible: false,
            });
        });
    }
    handleNewFloderOk(e) {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                this.createFolder(data.name);
            }
        });
    }
    handleTableChange(pagination) {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetchData(pagination.current, pagination.pageSize);
    }
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    }
    componentDidMount() {
        const c = new Clipboard('.btnCopy');
        this.setState({
            clipboard: c,
        });
        c.on('success', function() {
            message.success('复制链接成功');
        });
        this.fetchData();
        this.fetchFolderName();
    }
    componentDidUpdate(prev) {
        if (prev.match.params.folderId !== this.props.match.params.folderId) {
            this.fetchData();
            this.fetchFolderName();
        }
    }
    componentWillUnmount() {
        this.state.clipboard.destroy();
    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const uploadProps = {
            name: 'file',
            multiple: true,
            action: '/api/upload/static-files?parentId=' + (this.props.match.params.folderId || ''),
            headers: { authorization: localStorage.getItem(config.tokenKey) || '' },
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
        const { getFieldDecorator } = this.props.form;
        return (
            <PageHeaderWrapper title="静态文件列表" content="控制台----静态文件列表">
                <div className="main-content">
                    <div className="panel">
                        <Button type="primary" onClick={() => this.setState({ visible: true })}>
                            <i className="fa fa-arrow-up fa-fw">&nbsp;</i>
                            上传
                        </Button>
                        {this.props.match.params.folderId ? (
                            ''
                        ) : (
                            <Button type="primary" onClick={() => this.setState({ isShowNewFolderDialog: true })}>
                                <i className="fa fa-plus-square fa-fw">&nbsp;</i>
                                新建文件夹
                            </Button>
                        )}
                        <Popconfirm
                            title="确认要删除？"
                            placement="right"
                            visible={this.state.delConfirmVisible}
                            onVisibleChange={() => {
                                if (this.state.selectedRowKeys.length <= 0) {
                                    message.info('请选择要删除的文件');
                                    return;
                                }
                                this.setState({
                                    delConfirmVisible: !this.state.delConfirmVisible,
                                });
                            }}
                            onConfirm={() => this.batchDeleteFile()}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type="danger">
                                <i className="fa fa-fw fa-trash-o fa-fw">&nbsp;</i>
                                批量删除
                            </Button>
                        </Popconfirm>
                        {this.props.match.params.folderId && (
                            <>
                                <span style={{ marginLeft: '20px' }}>当前目录为：{this.state.folderName}</span>
                                <Link
                                    style={{
                                        marginLeft: '10px',
                                        color: '#fff',
                                        backgroundColor: '#1890ff',
                                        padding: '3px 8px',
                                        borderRadius: '2px',
                                    }}
                                    to="/code/static-files"
                                >
                                    返回上一级
                                </Link>
                            </>
                        )}
                    </div>
                    <Modal
                        title="上传文件"
                        visible={this.state.visible}
                        onOk={() => this.handleOk()}
                        onCancel={() =>
                            this.setState({
                                visible: false,
                            })
                        }
                    >
                        <Dragger {...uploadProps}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or
                                other band files
                            </p>
                        </Dragger>
                    </Modal>
                    <Modal
                        title="新建文件夹"
                        visible={this.state.isShowNewFolderDialog}
                        onCancel={() =>
                            this.setState({
                                isShowNewFolderDialog: false,
                            })
                        }
                        footer={null}
                    >
                        <Form onSubmit={e => this.handleNewFloderOk(e)}>
                            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 10 }} label="文件夹名称：">
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '文件夹名称长度要在1-25个字符之间！',
                                            min: 1,
                                            max: 25,
                                        },
                                    ],
                                    initialValue: null,
                                })(<Input type="text" width="100%" />)}
                            </FormItem>
                            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 10 }} label="操作：">
                                <Button type="primary" htmlType="submit">
                                    新建
                                </Button>
                            </FormItem>
                        </Form>
                    </Modal>
                    <div className="table-wrapper">
                        <Table
                            rowKey={record => record._id}
                            rowSelection={rowSelection}
                            columns={this.getTableColums()}
                            dataSource={this.state.files}
                            loading={this.state.loading}
                            onChange={pagination => this.handleTableChange(pagination)}
                            pagination={{
                                showTotal: total => `共 ${total} 条数据`,
                            }}
                        />
                    </div>
                </div>
            </PageHeaderWrapper>
        );
    }
}

export default Form.create()(StaticFiles);
