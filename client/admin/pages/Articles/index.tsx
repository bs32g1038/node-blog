import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from '@blog/client/admin/axios';
import queryString from 'query-string';
import { parseTime } from '@blog/client/libs/time';
import scrollIntoView from '@blog/client/admin/utils/scroll.into.view';
import { Table, Button, Popconfirm, message, Input, Row, Tag, Typography, Image, Space } from 'antd';
import { PlusOutlined, DeleteFilled, EditFilled, SearchOutlined, HighlightOutlined } from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts';
import ActionCard from '@blog/client/admin/components/ActionCard';

export default function Index() {
    const [state, setState] = useState({
        articles: [],
        pagination: {
            current: 1,
            total: 0,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} 条数据`,
        },
        selectedRowKeys: [],
        loading: false,
        visible: false,
        searchKey: '',
        isResetFetch: false,
    });
    const fetchData = (page = 1, limit = 10) => {
        setState((data) => {
            return { ...data, isResetFetch: false, loading: true };
        });
        const query = {
            limit,
            page,
        };
        if (state.searchKey) {
            Object.assign(query, {
                title: state.searchKey,
            });
        }
        axios.get('/articles?' + queryString.stringify(query)).then((res) => {
            const pagination = { ...state.pagination, current: page, total: res.data.totalCount };
            setState((data) => ({
                ...data,
                articles: res.data.items,
                loading: false,
                pagination,
            }));
            scrollIntoView('article-panel');
        });
    };
    const deleteArticle = (_id) => {
        axios.delete('/articles/' + _id).then(() => {
            message.success('删除文章成功！');
            fetchData();
        });
    };
    const batchDeleteArticle = () => {
        axios
            .delete('/articles', {
                data: { articleIds: state.selectedRowKeys },
            })
            .then((res) => {
                if (res && res.data && res.data.ok === 1 && res.data.deletedCount > 0) {
                    message.success('删除文章成功！');
                    setState((data) => ({
                        ...data,
                        selectedRowKeys: [],
                    }));
                    return fetchData();
                }
                return message.error('删除文章失败，请重新尝试。');
            });
    };
    const getTableColums = () => {
        return [
            {
                title: '文章摘要',
                dataIndex: 'title',
                render: (text, record) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '15px' }}>
                            <a href={'/blog/articles/' + record._id} className="thumbnail">
                                <Image
                                    preview={false}
                                    alt=""
                                    src={record.screenshot}
                                    width="100px"
                                    height="60px"
                                    fallback="data:image/png;base64,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"
                                />
                            </a>
                        </div>
                        <div>
                            <Typography.Paragraph style={{ fontSize: '14px', fontWeight: 'normal' }}>
                                {text}
                            </Typography.Paragraph>
                            <div>
                                <Button
                                    size="small"
                                    title="编辑"
                                    type="link"
                                    icon={<EditFilled />}
                                    onClick={() => Router.push('/admin/content/articles/edit/' + record._id)}
                                >
                                    编辑
                                </Button>
                                <Popconfirm
                                    title="确认要删除？"
                                    onConfirm={() => deleteArticle(record._id)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button danger type="link" size="small" title="删除" icon={<DeleteFilled />}>
                                        删除
                                    </Button>
                                </Popconfirm>
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                title: '分类',
                dataIndex: 'category',
                width: 100,
                render: (text, record) => (record.category ? record.category.name : '未分类'),
            },
            {
                title: '浏览数',
                dataIndex: 'viewsCount',
                width: 80,
            },
            {
                title: '评论数',
                dataIndex: 'commentCount',
                width: 80,
            },
            {
                title: '状态',
                dataIndex: 'isDraft',
                render: (text, record) =>
                    record.isDraft ? <Tag color="rgb(229, 239, 245);">草稿</Tag> : <Tag color="default">已发布</Tag>,
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                width: 160,
                render: (text, record) => parseTime(record.createdAt),
            },
        ];
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
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange.bind(this),
    };
    const CTitle = (
        <Row justify="space-between">
            <Space>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => Router.push('/admin/content/articles/edit')}
                >
                    添加文档
                </Button>
                <Popconfirm
                    title="确认要删除？"
                    placement="right"
                    visible={state.visible}
                    onVisibleChange={() => {
                        if (state.selectedRowKeys.length <= 0) {
                            message.info('请选择要删除的文章');
                            return;
                        }
                        setState((data) => ({
                            ...data,
                            visible: !state.visible,
                        }));
                    }}
                    onConfirm={() => batchDeleteArticle()}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button danger={true} icon={<DeleteFilled />}>
                        批量删除
                    </Button>
                </Popconfirm>
            </Space>
            <Space>
                <Input
                    type="text"
                    name="searchTitle"
                    placeholder="请输入文章标题关键词"
                    value={state.searchKey}
                    onChange={(e) => {
                        const value = e.currentTarget.value;
                        setState((val) => ({
                            ...val,
                            searchKey: value,
                        }));
                    }}
                />
                <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={() => {
                        fetchData();
                    }}
                >
                    查询
                </Button>
                <Button
                    type="primary"
                    icon={<HighlightOutlined />}
                    onClick={() => {
                        setState((value) => ({
                            ...value,
                            searchKey: '',
                            isResetFetch: true,
                        }));
                    }}
                >
                    重置
                </Button>
            </Space>
        </Row>
    );
    return (
        <BasicLayout>
            <ActionCard title={CTitle} bodyStyle={{ padding: 0 }}>
                <Table
                    rowKey={(record) => record._id}
                    rowSelection={rowSelection}
                    columns={getTableColums()}
                    dataSource={state.articles}
                    pagination={state.pagination}
                    loading={state.loading}
                    onChange={(pagination) => handleTableChange(pagination)}
                />
            </ActionCard>
        </BasicLayout>
    );
}
