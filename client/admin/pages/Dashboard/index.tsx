import React, { useState, useEffect } from 'react';
import PageHeaderWrapper from '@blog/client/admin/components/PageHeaderWrapper';
import { Col, Row } from 'antd';
import * as api from './service';
import PageHeaderContent from './PageHeaderContent';
import ExtraContent from './ExtraContent';
import RecentCommentList from './RecentCommentList';
import NavPanel from './NavPanel';
import ServerStatePanel from './ServerStatePanel';
import LoginLogPanel from './LoginLogPanel';

const links = [
    {
        icon: 'fa-edit',
        title: '文章管理',
        href: '/content/articles',
    },
    {
        icon: 'fa-plus',
        title: '添加文章',
        href: '/content/articles/edit',
    },
    {
        icon: 'fa-comment',
        title: '评论管理',
        href: '/content/comments',
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
        setState(state => ({
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
        <PageHeaderWrapper
            title="分析页"
            content={
                <PageHeaderContent
                    currentUser={{
                        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                        name: state.userInfo.account,
                        title: state.userInfo.type === 'admin' ? '核心管理员' : '普通管理员',
                        group: '前端开发技术部',
                    }}
                />
            }
            extraContent={<ExtraContent statisticalInfo={state.statisticalInfo} />}
        >
            <Row gutter={24}>
                <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                    <RecentCommentList
                        loading={state.loading}
                        recentComments={state.recentComments}
                    ></RecentCommentList>
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                    <NavPanel loading={state.loading} links={links}></NavPanel>
                    <ServerStatePanel loading={state.loading} systemInfo={state.systemInfo}></ServerStatePanel>
                    <LoginLogPanel loading={state.loading} recentAdminLogs={state.recentAdminLogs}></LoginLogPanel>
                </Col>
            </Row>
        </PageHeaderWrapper>
    );
};
