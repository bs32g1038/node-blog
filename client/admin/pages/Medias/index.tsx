import React, { useState, useEffect } from 'react';
import axios from '@blog/client/admin/axios';
import queryString from 'query-string';
import { parseTime } from '@blog/client/libs/time';
import Clipboard from 'clipboard';
import { Row, Button, Popconfirm, message, Alert, Pagination, Card } from 'antd';
import PageHeaderWrapper from '@blog/client/admin/components/PageHeaderWrapper';
import { MediaListRow, WrapCard } from './style';
const { Meta } = Card;

export default () => {
    const [state, setState] = useState({
        medias: new Array(8).fill({}),
        pagination: { current: 1, total: 0 },
        loading: false,
        clipboard: null,
    });
    const fetchData = (page = 1, limit = 10) => {
        setState(data => ({ ...data, loading: true }));
        const query = {
            limit,
            page,
        };
        return axios.get('/medias?' + queryString.stringify(query)).then(res => {
            const pagination = { ...state.pagination };
            pagination.total = res.data.totalCount;
            setState(data => ({ ...data, medias: res.data.items, loading: false, pagination }));
        });
    };
    const deleteFile = _id => {
        axios.delete('/medias/' + _id).then(() => {
            message.success('删除文件成功');
            fetchData();
        });
    };
    const onShowSizeChange = (current, pageSize) => {
        const pager = { ...state.pagination };
        pager.current = current;
        setState(data => ({
            ...data,
            pagination: pager,
        }));
        fetchData(current, pageSize);
    };
    useEffect(() => {
        const c = new Clipboard('.btnCopy');
        setState(data => ({
            ...data,
            clipboard: c,
        }));
        c.on('success', function() {
            message.success('复制链接成功');
        });
        fetchData();
        return () => {
            if (state.clipboard) {
                state.clipboard.destroy();
            }
        };
    }, [1]);
    return (
        <PageHeaderWrapper title="媒体文件列表" content="控制台----媒体文件列表">
            <div className="main-content">
                <div className="table-wrapper">
                    {(state.loading || state.medias.length <= 0) && (
                        <Alert
                            showIcon
                            message="暂无数据..."
                            description="该页面并没有数据，如果是网络问题，请重新刷新。"
                            type="success"
                        />
                    )}
                    <MediaListRow type="flex">
                        {state.medias.map((item, index) => {
                            return (
                                <WrapCard
                                    loading={state.loading}
                                    key={'aaa' + index}
                                    cover={
                                        !item._id || state.loading ? (
                                            false
                                        ) : (
                                            <img alt={item.originalName} src={item.filePath + '/' + item.fileName} />
                                        )
                                    }
                                    actions={[
                                        <Button
                                            key="viewButton"
                                            size="small"
                                            title="查看大图"
                                            href={'//' + window.location.host + item.filePath + '/' + item.fileName}
                                            target="_blank"
                                            className="button button-view"
                                        >
                                            <i className="fa fa-eye fa-fw" style={{ color: '#fff' }}></i>
                                            大图
                                        </Button>,
                                        <Button
                                            key="copyButton"
                                            type="primary"
                                            size="small"
                                            title="复制"
                                            data-clipboard-text={
                                                window.location.host + item.filePath + '/' + item.fileName
                                            }
                                            className="button"
                                        >
                                            <i className="fa fa-link fa-fw" style={{ color: '#fff' }}></i>
                                            复制
                                        </Button>,
                                        <Popconfirm
                                            key="confirmButton"
                                            title="确认要删除？"
                                            onConfirm={() => deleteFile(item._id)}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <Button type="danger" size="small" title="删除" className="button">
                                                <i className="fa fa-trash-o fa-fw" style={{ color: '#fff' }}></i>
                                                删除
                                            </Button>
                                        </Popconfirm>,
                                    ]}
                                >
                                    <Meta
                                        title={item.originalName}
                                        description={'创建时间：' + parseTime(item.createdAt)}
                                    />
                                </WrapCard>
                            );
                        })}
                    </MediaListRow>
                    <Row type="flex" justify="end" style={{ marginTop: '20px' }}>
                        <Pagination
                            showTotal={total => `共 ${total} 条数据`}
                            showSizeChanger={true}
                            defaultCurrent={state.pagination.current}
                            total={state.pagination.total}
                            onShowSizeChange={(current, pageSize) => onShowSizeChange(current, pageSize)}
                            onChange={(current, pageSize) => onShowSizeChange(current, pageSize)}
                        />
                    </Row>
                </div>
            </div>
        </PageHeaderWrapper>
    );
};
