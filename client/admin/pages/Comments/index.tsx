import React, { useEffect, useState } from 'react';
import axios from '@blog/client/admin/axios';
import queryString from 'query-string';
import marked from '@blog/client/libs/marked';
import { timeAgo } from '@blog/client/libs/time';
import { Table, Button, Popconfirm, message } from 'antd';
import {
    Wrap,
    ReplyListItem,
    UserAvatar,
    ReplyContent,
    ReplyInfo,
    BaseInfo,
    MarkdownText,
    UserAction,
    Tip,
} from './style';
import { gernateAvatarImage } from '@blog/client/common/helper.util';
import scrollIntoView from '@blog/client/admin/utils/scroll.into.view';
import Router from 'next/router';
import { PanelDiv } from '@blog/client/admin/styles';
import { DeleteFilled, EditFilled, SendOutlined, CommentOutlined, BranchesOutlined } from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts';

export default () => {
    const [state, setState] = useState({
        pagination: { current: 1, total: 0 },
        comments: [],
        selectedRowKeys: [],
        loading: false,
        visiable: false,
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
        axios.get('/comments?' + queryString.stringify(query)).then(res => {
            const pagination = { ...state.pagination };
            pagination.total = res.data.totalCount;
            setState(data => ({
                ...data,
                comments: res.data.items,
                loading: false,
                pagination,
            }));
            scrollIntoView('comments-panel');
        });
    };
    const deleteComment = _id => {
        axios.delete('/comments/' + _id).then(() => {
            message.success('删除评论成功');
            fetchData();
        });
    };
    const batchDeleteComment = () => {
        axios
            .delete('/comments', {
                data: { commentIds: state.selectedRowKeys },
            })
            .then(res => {
                if (res && res.data && res.data.ok === 1 && res.data.deletedCount > 0) {
                    message.success('删除评论成功！');
                    setState(data => ({
                        ...data,
                        selectedRowKeys: [],
                    }));
                    return fetchData();
                }
                return message.error('删除评论失败，请重新尝试。');
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
                title: '昵称',
                dataIndex: 'nickName',
                width: 160,
            },
            {
                title: 'email',
                dataIndex: 'email',
                width: 100,
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                width: 140,
                render: (text, record) => timeAgo(record.createdAt),
            },
            {
                title: '文章标题',
                dataIndex: 'article',
                render: (text, record) => (record.article && record.article.title) || '--',
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
                            onClick={() => Router.push('/admin/content/comments/reply/' + record._id)}
                        >
                            回复
                        </Button>
                        ,
                        <Popconfirm
                            title="确认要删除？"
                            onConfirm={() => deleteComment(record._id)}
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
    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange.bind(this),
    };
    const expandedRowKeys = state.comments.map(item => item._id);
    return (
        <BasicLayout>
            <Wrap className="main-content">
                <PanelDiv className="panel" id="comments-panel">
                    <Popconfirm
                        title="确认要删除？"
                        placement="right"
                        visible={state.visiable}
                        onVisibleChange={() => {
                            if (state.selectedRowKeys.length <= 0) {
                                message.info('请选择要删除的评论');
                                return;
                            }
                            setState(data => ({
                                ...data,
                                visiable: !state.visiable,
                            }));
                        }}
                        onConfirm={() => batchDeleteComment()}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="danger" icon={<DeleteFilled />}>
                            批量删除
                        </Button>
                    </Popconfirm>
                </PanelDiv>
                <div className="table-wrapper">
                    <Table
                        rowKey={record => record._id}
                        rowSelection={rowSelection}
                        columns={getTableColums()}
                        loading={state.loading}
                        dataSource={state.comments}
                        onChange={pagination => handleTableChange(pagination)}
                        pagination={{
                            showTotal: total => `共 ${total} 条评论数据`,
                        }}
                        expandedRowRender={record => {
                            return (
                                <React.Fragment>
                                    {record.reply && (
                                        <div>
                                            <Tip className="tip">
                                                <BranchesOutlined />
                                                引用：
                                            </Tip>
                                            <ReplyListItem>
                                                <UserAvatar>
                                                    <img src={gernateAvatarImage(record.reply.nickName)} />
                                                </UserAvatar>
                                                <ReplyContent>
                                                    <ReplyInfo>
                                                        <BaseInfo>
                                                            <div className="reply-author">{record.reply.nickName}</div>
                                                            <a className="reply-time">
                                                                在 {timeAgo(record.reply.createdAt)} 评论
                                                            </a>
                                                        </BaseInfo>
                                                        <UserAction>
                                                            <Button
                                                                size="small"
                                                                icon={<SendOutlined />}
                                                                onClick={() => {
                                                                    Router.push(
                                                                        '/admin/content/comments/reply/' +
                                                                            record.reply._id
                                                                    );
                                                                }}
                                                            >
                                                                回复
                                                            </Button>
                                                        </UserAction>
                                                    </ReplyInfo>
                                                    <MarkdownText
                                                        className="markdown-body"
                                                        dangerouslySetInnerHTML={{
                                                            __html: marked(record.reply.content),
                                                        }}
                                                    ></MarkdownText>
                                                </ReplyContent>
                                            </ReplyListItem>
                                        </div>
                                    )}

                                    <div style={{ padding: '0 20px' }}>
                                        <Tip className="tip">
                                            <CommentOutlined />
                                            评论内容：
                                        </Tip>
                                        <div
                                            className="markdown-body"
                                            dangerouslySetInnerHTML={{
                                                __html: marked(record.content),
                                            }}
                                        ></div>
                                    </div>
                                </React.Fragment>
                            );
                        }}
                        expandedRowKeys={expandedRowKeys}
                    />
                </div>
            </Wrap>
        </BasicLayout>
    );
};
