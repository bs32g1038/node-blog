import React, { useState } from 'react';
import SiderMenu from './SiderMenu';
import Breadcrumb from '@blog/client/admin/components/Breadcrumb';

import { Layout, FloatButton } from 'antd';
const { Content } = Layout;

interface Props {
    children: React.ReactNode;
}

export default function Layouts(props: Props) {
    const [state] = useState({
        collapsed: false,
    });

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
                <FloatButton.BackTop></FloatButton.BackTop>
            </Layout>
        </Layout>
    );
}
