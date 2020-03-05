import React, { useState, useEffect } from 'react';
import { Layout, BackTop } from 'antd';
const { Content } = Layout;
import SiderMenu from './SiderMenu';
import Breadcrumb from '../../components/Breadcrumb';
import { isLogin } from '@blog/client/admin/utils/is-login';

import 'antd/dist/antd.css';

interface Props {
    children: React.ReactNode;
}

export default (props: Props) => {
    const [state] = useState({
        collapsed: false,
    });

    useEffect(() => {
        isLogin();
    }, [1]);

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
};
