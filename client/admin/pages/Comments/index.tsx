import React, { useCallback, useEffect, useState } from 'react';
import { parseTime, timeAgo } from '@blog/client/libs/time';
import { Button, Popconfirm, Space, message } from 'antd';
import { handleEmoji } from '@blog/client/common/helper.util';
import Router from 'next/router';
import { DeleteFilled, EditFilled, SendOutlined, CommentOutlined, BranchesOutlined } from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts';
import style from './style.module.scss';
import ActionCard from '@blog/client/admin/components/ActionCard';
import { useDeleteCommentMutation, useDeleteCommentsMutation, useFetchCommentsMutation } from './service';
import CTable from '@blog/client/admin/components/CTable';
import { wrapper } from '@blog/client/redux/store';
import Avatar from 'boring-avatars';
import { xss } from '@blog/client/libs/marked';

export default function Comments(props) {
    wrapper.useHydration(props);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [visible, setVisible] = useState(false);
    const [fetchComments, { data = { items: [], totalCount: 0 }, isLoading }] = useFetchCommentsMutation();
    const [state, setState] = useState({
        current: 1,
        pageSize: 10,
    });
    const fetchData = useCallback(() => {
        const query = {
            page: state.current || 1,
            limit: state.pageSize || 10,
        };
        fetchComments(query)
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
    }, [fetchComments, state]);
    const [_deleteComment] = useDeleteCommentMutation();
    const deleteComment = (id) => {
        _deleteComment({ id }).then(() => {
            message.success('删除评论成功');
            fetchData();
        });
    };
    const [_deleteComments] = useDeleteCommentsMutation();
    const batchDeleteComment = () => {
        _deleteComments({ commentIds: selectedRowKeys })
            .unwrap()
            .then((res) => {
                if (res && res.deletedCount > 0) {
                    message.success('删除评论成功！');
                    return fetchData();
                }
                message.error('删除评论失败，请重新尝试。');
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
    const getTableColums = () => {
        return [
            {
                title: '昵称',
                dataIndex: 'nickName',
                width: 160,
            },
            {
                title: '文章标题',
                dataIndex: 'article',
                render: (text, record) => (record.article && record.article.title) || '--',
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                width: 180,
                render: (text, record) => parseTime(record.createdAt),
            },
            {
                title: '操作',
                key: 'operation',
                width: 180,
                render: (text, record) => (
                    <Space>
                        <Button
                            type="primary"
                            size="small"
                            title="编辑"
                            icon={<EditFilled />}
                            onClick={() => Router.push('/admin/content/comments/reply/' + record._id)}
                        >
                            回复
                        </Button>
                        <Popconfirm title="确认要删除？" onConfirm={() => deleteComment(record._id)}>
                            <Button danger={true} size="small" title="删除" icon={<DeleteFilled />}>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange.bind(this),
    };
    const expandedRowKeys = data.items.map((item) => item._id);
    const CTitle = (
        <Popconfirm
            title="确认要删除？"
            placement="right"
            open={visible}
            onOpenChange={() => {
                if (selectedRowKeys.length <= 0) {
                    message.info('请选择要删除的评论');
                    return;
                }
                setVisible(!visible);
            }}
            onConfirm={() => batchDeleteComment()}
        >
            <Button danger={true} icon={<DeleteFilled />}>
                批量删除
            </Button>
        </Popconfirm>
    );
    return (
        <BasicLayout>
            <ActionCard title={CTitle} bodyStyle={{ padding: 0 }}>
                <CTable
                    rowKey={(record) => record._id}
                    rowSelection={rowSelection}
                    columns={getTableColums()}
                    loading={isLoading}
                    dataSource={data.items}
                    onChange={(pagination) => handleTableChange(pagination)}
                    pagination={{
                        current: state.current,
                        pageSize: state.pageSize,
                        total: data.totalCount,
                    }}
                    expandedRowRender={(record) => {
                        return (
                            <React.Fragment>
                                {record.reply && (
                                    <div>
                                        <div className={style.tip}>
                                            <BranchesOutlined />
                                            引用：
                                        </div>
                                        <div className={style.replyListItem}>
                                            <div className={style.userAvatar}>
                                                <Avatar size={32} name={record.reply.nickName} variant="beam" />
                                            </div>
                                            <div className={style.replyContent}>
                                                <div className={style.replyInfo}>
                                                    <div className={style.baseInfo}>
                                                        <div className="reply-author">{record.reply.nickName}</div>
                                                        <a className="reply-time">
                                                            在 {timeAgo(record.reply.createdAt)} 评论
                                                        </a>
                                                    </div>
                                                    <div className={style.userAction}>
                                                        <Button
                                                            size="small"
                                                            icon={<SendOutlined />}
                                                            onClick={() => {
                                                                Router.push(
                                                                    '/admin/content/comments/reply/' + record.reply._id
                                                                );
                                                            }}
                                                        >
                                                            回复
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div
                                                    className={style.markdownText}
                                                    dangerouslySetInnerHTML={{
                                                        __html: xss(handleEmoji(record.reply.content)),
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div style={{ padding: '0 20px' }}>
                                    <div className={style.tip}>
                                        <CommentOutlined />
                                        评论内容：
                                    </div>
                                    <div
                                        className="markdown-body"
                                        dangerouslySetInnerHTML={{
                                            __html: xss(handleEmoji(record.content)),
                                        }}
                                    ></div>
                                </div>
                            </React.Fragment>
                        );
                    }}
                    expandedRowKeys={expandedRowKeys}
                />
            </ActionCard>
        </BasicLayout>
    );
}
