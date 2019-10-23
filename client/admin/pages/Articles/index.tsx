import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from '@blog/client/admin/axios';
import queryString from 'query-string';
import { parseTime } from '@blog/client/libs/time';
import { Table, Button, Popconfirm, message, Input, Row, Col, Tag } from 'antd';
import PageHeaderWrapper from '@blog/client/admin/components/PageHeaderWrapper';
import styled from '@emotion/styled';

const PanelDiv = styled.div`
    margin-bottom: 20px;
`;

const ModuleControlRow = styled(Row)`
    button {
        margin-right: 8px;
    }
`;

const SearchForm = styled.form`
    button {
        margin-left: 8px;
    }
`;

export default () => {
    const [state, setState] = useState({
        articles: [],
        pagination: {
            current: 1,
            total: 0,
        },
        selectedRowKeys: [],
        loading: false,
        visible: false,
    });
    const fetchData = (page = 1, limit = 10) => {
        setState(data => {
            return { ...data, loading: true };
        });
        const query = {
            limit,
            page,
        };
        axios.get('/articles?' + queryString.stringify(query)).then(res => {
            const pagination = { ...state.pagination };
            pagination.total = res.data.totalCount;
            setState(data => ({
                ...data,
                articles: res.data.items,
                loading: false,
                pagination,
            }));
        });
    };
    const deleteArticle = _id => {
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
            .then(res => {
                if (res && res.data && res.data.ok === 1 && res.data.deletedCount > 0) {
                    message.success('删除文章成功！');
                    setState(data => ({
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
                title: '缩略图',
                dataIndex: 'screenshot',
                render: (text, record) => (
                    <a href={'/blog/articles/' + record._id} className="thumbnail">
                        <img src={record.screenshot} alt="冷夜流星博客" width="100" height="60" />
                    </a>
                ),
            },
            { title: '文章标题', dataIndex: 'title' },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                render: (text, record) => parseTime(record.createdAt),
            },
            {
                title: '分类',
                dataIndex: 'category',
                width: 100,
                render: (text, record) => (record.category ? record.category.name : '未分类'),
            },
            {
                title: '浏览次数',
                dataIndex: 'viewsCount',
                width: 90,
            },
            {
                title: '评论数',
                dataIndex: 'commentCount',
                width: 90,
            },
            {
                title: '状态',
                dataIndex: 'isDraft',
                render: (text, record) =>
                    record.isDraft ? <Tag color="red">草稿</Tag> : <Tag color="green">已发布</Tag>,
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
                            onClick={() => Router.push('/admin/content/articles/edit/' + record._id)}
                        >
                            <i className="fa fa-edit fa-fw"></i>
                            编辑
                        </Button>
                        ,
                        <Popconfirm
                            title="确认要删除？"
                            onConfirm={() => deleteArticle(record._id)}
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
    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange.bind(this),
    };
    return (
        <PageHeaderWrapper title="文章列表" content="控制台----文章列表">
            <div className="main-content">
                <PanelDiv>
                    <ModuleControlRow type="flex" justify="space-between">
                        <Col>
                            <Button type="primary" onClick={() => Router.push('/admin/content/articles/edit')}>
                                <i className="fa fa-plus-square fa-fw">&nbsp;</i>
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
                                    setState(data => ({
                                        ...data,
                                        visible: !state.visible,
                                    }));
                                }}
                                onConfirm={() => batchDeleteArticle()}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button type="danger">
                                    <i className="fa fa-fw fa-trash-o fa-fw">&nbsp;</i>
                                    批量删除
                                </Button>
                            </Popconfirm>
                        </Col>
                        <Col style={{ flex: '1 0 auto' }}>
                            <SearchForm action="/admin/manage/contentList">
                                <div className="search-input-group">
                                    <Row type="flex" justify="end">
                                        <Col>
                                            <Input type="text" name="searchKey" placeholder="请输入需要查询的关键字" />
                                        </Col>
                                        <Col>
                                            <Button type="primary">
                                                <i className="fa fa-search fa-fw"></i>搜索
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </SearchForm>
                        </Col>
                    </ModuleControlRow>
                </PanelDiv>
                <div className="table-wrapper">
                    <Table
                        rowKey={record => record._id}
                        rowSelection={rowSelection}
                        columns={getTableColums()}
                        dataSource={state.articles}
                        pagination={state.pagination}
                        loading={state.loading}
                        onChange={pagination => handleTableChange(pagination)}
                    />
                </div>
            </div>
        </PageHeaderWrapper>
    );
};