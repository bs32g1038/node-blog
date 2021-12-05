import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from '@blog/client/admin/axios';
import queryString from 'query-string';
import { parseTime } from '@blog/client/libs/time';
import scrollIntoView from '@blog/client/admin/utils/scroll.into.view';
import { Table, Button, Popconfirm, message, Input, Row, Col, Tag, Typography } from 'antd';
import { PlusOutlined, DeleteFilled, EditFilled, SearchOutlined, HighlightOutlined } from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts';
import style from './style.module.scss';

export default () => {
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
                                <img src={record.screenshot} width="100" height="60" />
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
    }, [state.isResetFetch]);
    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange.bind(this),
    };
    return (
        <BasicLayout>
            <div>
                <div className={style.adminPanelDiv} id="article-panel">
                    <div className={style.moduleControlRow}>
                        <Col>
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
                        </Col>
                        <Col style={{ flex: '1 0 auto' }}>
                            <div className={style.searchWrap}>
                                <div className="search-input-group">
                                    <Row justify="end">
                                        <Col flex="0 0 auto">
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
                                        </Col>
                                        <Col flex="0 0 auto">
                                            <Button
                                                type="primary"
                                                icon={<SearchOutlined />}
                                                onClick={() => {
                                                    fetchData();
                                                }}
                                            >
                                                查询
                                            </Button>
                                        </Col>
                                        <Col flex="0 0 auto">
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
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </div>
                </div>
                <div className="table-wrapper">
                    <Table
                        rowKey={(record) => record._id}
                        rowSelection={rowSelection}
                        columns={getTableColums()}
                        dataSource={state.articles}
                        pagination={state.pagination}
                        loading={state.loading}
                        onChange={(pagination) => handleTableChange(pagination)}
                    />
                </div>
            </div>
        </BasicLayout>
    );
};
