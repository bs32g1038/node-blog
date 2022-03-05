import React, { useState, useEffect } from 'react';
import axios from '@blog/client/admin/axios';
import queryString from 'query-string';
import { parseTime } from '@blog/client/libs/time';
import scrollIntoView from '@blog/client/admin/utils/scroll.into.view';
import { Button, Popconfirm, message, Space, List, Skeleton, Avatar } from 'antd';
import { PlusOutlined, DeleteFilled, EditFilled, TagOutlined } from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts';
import style from './style.module.scss';
import exlporeAvatar from '@blog/client/assets/svgs/explore-avatar.svg';
import ActionCard from '@blog/client/admin/components/ActionCard';
import Modal from './Modal';

export default () => {
    const [state, setState] = useState({
        exploreList: [],
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
        isVisibleWriter: false,
        editId: '',
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
        axios.get('/explore?' + queryString.stringify(query)).then((res) => {
            const pagination = { ...state.pagination, current: page, total: res.data.totalCount };
            setState((data) => ({
                ...data,
                exploreList: res.data.items,
                loading: false,
                pagination,
            }));
            scrollIntoView('article-panel');
        });
    };
    const deleteExplore = (_id) => {
        axios.delete('/explore/' + _id).then(() => {
            message.success('删除成功！');
            fetchData();
        });
    };
    useEffect(() => {
        fetchData();
    }, [state.isResetFetch]);
    const CTitle = (
        <Space>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setState((val) => ({ ...val, isVisibleWriter: true }))}
            >
                添加发现
            </Button>
        </Space>
    );
    return (
        <div>
            <BasicLayout>
                <ActionCard title={CTitle}>
                    <List
                        className={style.wrap}
                        itemLayout="horizontal"
                        dataSource={state.exploreList}
                        renderItem={(item: any) => (
                            <List.Item
                                actions={[
                                    <Button
                                        size="small"
                                        title="编辑"
                                        type="link"
                                        icon={<EditFilled />}
                                        onClick={() =>
                                            setState((val) => ({ ...val, isVisibleWriter: true, editId: item._id }))
                                        }
                                    >
                                        编辑
                                    </Button>,
                                    <Popconfirm
                                        title="确认要删除？"
                                        onConfirm={() => deleteExplore(item._id)}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button danger type="link" size="small" title="删除" icon={<DeleteFilled />}>
                                            删除
                                        </Button>
                                    </Popconfirm>,
                                ]}
                            >
                                <Skeleton avatar title={false} loading={false} active>
                                    <List.Item.Meta
                                        avatar={<Avatar src={exlporeAvatar}></Avatar>}
                                        title={
                                            <Space>
                                                <TagOutlined />
                                                <span className={style.commentHeaderTime}>
                                                    {parseTime(item.createdAt)}
                                                </span>
                                            </Space>
                                        }
                                        description={item.content}
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </ActionCard>
            </BasicLayout>
            {state.isVisibleWriter && (
                <Modal
                    id={state.editId}
                    visible={state.isVisibleWriter}
                    onCancel={() => {
                        setState((val) => {
                            return { ...val, isVisibleWriter: false, editId: '' };
                        });
                        fetchData();
                    }}
                ></Modal>
            )}
        </div>
    );
};
