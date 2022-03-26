import React, { useState, useEffect } from 'react';
import SiderMenu from './SiderMenu';
import Breadcrumb from '@blog/client/admin/components/Breadcrumb';
import { isLogin } from '@blog/client/admin/api/is.login.api';

import { Layout, BackTop } from 'antd';
const { Content } = Layout;

import 'antd/dist/antd.css';

interface Props {
    children: React.ReactNode;
}

export default function Layouts(props: Props) {
    const [state] = useState({
        collapsed: false,
    });

    useEffect(() => {
        isLogin();
    }, []);

    return (
        <Layout style={{ marginLeft: state.collapsed ? 80 : 267 }}>
            <SiderMenu collapsed={state.collapsed}></SiderMenu>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Breadcrumb></Breadcrumb>
                <Content style={{ margin: '24px 24px 0', minHeight: 280 }}>{props.children}</Content>
                <BackTop style={{ right: '20px' }}></BackTop>
            </Layout>
        </Layout>
    );
}
