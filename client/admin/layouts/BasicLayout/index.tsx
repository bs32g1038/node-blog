import React, { useState } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import SiderMenu from './SiderMenu';
import Header from './Header';
import Footer from './Footer';

interface Props {
    children: React.ReactNode;
}

export default (props: Props) => {
    const [state, setState] = useState({
        collapsed: false,
    });

    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };
    return (
        <Layout style={{ marginLeft: state.collapsed ? 80 : 240 }}>
            <SiderMenu collapsed={state.collapsed}></SiderMenu>
            <Layout>
                <Header
                    collapsed={state.collapsed}
                    onCollapse={() => {
                        toggle();
                    }}
                />
                <Content style={{ margin: 24, minHeight: 280 }}>{props.children}</Content>
                <Footer></Footer>
            </Layout>
        </Layout>
    );
};
