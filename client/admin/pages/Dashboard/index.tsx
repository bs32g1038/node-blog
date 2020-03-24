import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import * as api from './service';
import RecentCommentList from './RecentCommentList';
import NavPanel from './NavPanel';
import LoginLogPanel from './LoginLogPanel';
import { PlusOutlined, CommentOutlined, EditFilled } from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts';

const links = [
    {
        icon: <EditFilled />,
        title: '文章管理',
        href: '/admin/content/articles',
    },
    {
        icon: <PlusOutlined />,
        title: '添加文章',
        href: '/admin/content/articles/edit',
    },
    {
        icon: <CommentOutlined />,
        title: '评论管理',
        href: '/admin/content/comments',
    },
];

export default () => {
    const [state, setState] = useState({
        loading: false,
        statisticalInfo: {},
        userInfo: {
            account: '',
            type: '',
        },
        systemInfo: {
            hostname: '',
            cpus: [
                {
                    model: '',
                },
            ],
            totalmem: 0,
            type: '',
            release: '',
        },
        recentComments: [],
        recentAdminLogs: [],
    });

    useEffect(() => {
        setState((state) => ({
            ...state,
            loading: true,
        }));
        Promise.all([
            api.getStatisticalInfo(),
            api.getUserLoginInfo(),
            api.getSystemInfo(),
            api.getRecentComments(),
            api.getRecentAdminLogs(),
        ]).then(([res1, res2, res3, res4, res5]) => {
            setState(() => ({
                statisticalInfo: res1.data,
                userInfo: res2.data,
                systemInfo: res3.data,
                recentComments: res4.data,
                recentAdminLogs: res5.data,
                loading: false,
            }));
        });
    }, [1]);

    return (
        <BasicLayout>
            <Row gutter={24}>
                <Col xl={15} lg={24} md={24} sm={24} xs={24}>
                    <RecentCommentList
                        loading={state.loading}
                        recentComments={state.recentComments}
                    ></RecentCommentList>
                </Col>
                <Col xl={9} lg={24} md={24} sm={24} xs={24}>
                    <NavPanel loading={state.loading} links={links}></NavPanel>
                    <LoginLogPanel loading={state.loading} recentAdminLogs={state.recentAdminLogs}></LoginLogPanel>
                </Col>
            </Row>
        </BasicLayout>
    );
};
