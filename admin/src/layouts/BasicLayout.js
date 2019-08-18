import React from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import GlobalFooter from '../components/GlobalFooter';
import Header from '../components/GlobalHeader';
import SiderMenu from '../components/SiderMenu';
import styles from './BasicLayout.module.scss';
import { renderRoutes } from 'react-router-config';
import Context from './MenuContext';
import getPageTitle from './getPageTitle';

const { Content } = Layout;

class BasicLayout extends React.Component {
    getContext() {
        const { location, route } = this.props;
        return {
            location,
            routes: route.routes,
        };
    }
    getLayoutStyle = () => {
        const { fixSiderbar, isMobile, collapsed, layout } = this.props;
        if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
            return {
                paddingLeft: collapsed ? '80px' : '256px',
            };
        }
        return null;
    };
    handleMenuCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    state = {
        collapsed: false,
    };
    render() {
        console.log(this.props);
        const pageTitle = getPageTitle(this.props);
        const { route, navTheme, layout: PropsLayout, isMobile, menuData, fixedHeader } = this.props;
        const isTop = PropsLayout === 'topmenu';
        const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
        const layout = (
            <Layout style={{ marginLeft: this.state.collapsed ? 80 : 240 }}>
                {isTop && !isMobile ? null : (
                    <SiderMenu
                        routes={route.routes}
                        theme={navTheme}
                        onCollapse={this.handleMenuCollapse}
                        menuData={menuData}
                        isMobile={isMobile}
                        collapsed={this.state.collapsed}
                        {...this.props}
                    />
                )}
                <Layout
                    style={{
                        ...this.getLayoutStyle(),
                        minHeight: '100vh',
                    }}
                >
                    <Header menuData={menuData} onCollapse={this.handleMenuCollapse} collapsed={this.state.collapsed} />
                    <Content className={styles.content} style={contentStyle}>
                        {renderRoutes(route.routes)}
                    </Content>
                    <GlobalFooter />
                </Layout>
            </Layout>
        );
        return (
            <React.Fragment>
                <DocumentTitle title={pageTitle}>
                    <Context.Provider value={this.getContext()}>{layout}</Context.Provider>
                </DocumentTitle>
            </React.Fragment>
        );
    }
}

export default BasicLayout;
