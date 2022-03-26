import React, { useState, useEffect, useCallback } from 'react';
import axios from '@blog/client/admin/axios';
import queryString from 'query-string';
import { parseTime } from '@blog/client/libs/time';
import scrollIntoView from '@blog/client/admin/utils/scroll.into.view';
import { Button, Image, Popconfirm, message, Space, List, Skeleton, Avatar } from 'antd';
import { PlusOutlined, DeleteFilled, EditFilled, TagOutlined } from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts';
import style from './style.module.scss';
import exlporeAvatar from '@blog/client/assets/svgs/explore-avatar.svg';
import ActionCard from '@blog/client/admin/components/ActionCard';
import Modal from './Modal';

const Index = () => {
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
    const fetchData = useCallback(
        (page = 1, limit = 10) => {
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
        },
        [state.pagination, state.searchKey]
    );
    const deleteExplore = (_id) => {
        axios.delete('/explore/' + _id).then(() => {
            message.success('删除成功！');
            fetchData();
        });
    };
    useEffect(() => {
        fetchData();
    }, [fetchData, state.isResetFetch]);
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
        <React.Fragment>
            <BasicLayout>
                <ActionCard title={CTitle}>
                    <List
                        className={style.wrap}
                        itemLayout="horizontal"
                        dataSource={state.exploreList}
                        renderItem={(item) => (
                            <List.Item
                                key={item.id}
                                actions={[
                                    <Button
                                        key="edit"
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
                                        key="delete"
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
                                        description={
                                            <div>
                                                <p>{item.content}</p>
                                                <p>
                                                    {item.links.map((item) => {
                                                        return (
                                                            <Space key={item} style={{ display: 'flex' }}>
                                                                <span>{item.title}</span>
                                                                <a target="_blank" href={item.link} rel="noreferrer">
                                                                    {item.link}
                                                                </a>
                                                            </Space>
                                                        );
                                                    })}
                                                </p>
                                                <p>
                                                    {item.pics.map((item: string) => {
                                                        return <Image key={item} width={120} src={item} alt="" />;
                                                    })}
                                                </p>
                                            </div>
                                        }
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
        </React.Fragment>
    );
};

export default Index;
