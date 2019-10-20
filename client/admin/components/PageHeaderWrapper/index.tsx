import React from 'react';
import { withRouter } from 'next/router';
import { PageHeader, Tabs, Typography } from 'antd';
import GridContent from './GridContent';
import { getFlatMenuKeys, getMenuMatches, itemRender } from './breadcrumb';
const { Title } = Typography;
import { WrapperDiv, WideDiv, ChildrenContentDiv } from './style';
import menus from '@blog/client/admin/configs/menu-config';

const renderFooter = ({ tabList, tabActiveKey, onTabChange, tabBarExtraContent }: any) => {
    return tabList && tabList.length ? (
        <Tabs
            activeKey={tabActiveKey}
            onChange={key => {
                if (onTabChange) {
                    onTabChange(key);
                }
            }}
            tabBarExtraContent={tabBarExtraContent}
        >
            {tabList.map(item => (
                <Tabs.TabPane tab={item.tab} key={item.key} />
            ))}
        </Tabs>
    ) : null;
};

interface Props {
    title?: string;
    content?: any;
    extraContent?: any;
    children?: any;
    contentWidth?: any;
    fluid?: any;
    logo?: any;
    router?: any;
}

const PageHeaderWrapper = ({
    children,
    contentWidth,
    fluid,
    title,
    content,
    logo,
    extraContent,
    router,
    ...restProps
}: Props) => {
    const breadcrumbs = getMenuMatches(getFlatMenuKeys(menus), router.pathname);
    breadcrumbs.unshift({
        path: '/',
        breadcrumbName: '首页',
    });
    return (
        <div style={{ margin: '-24px -24px 0' }}>
            <WrapperDiv>
                <WideDiv isWide={!fluid && contentWidth === 'Fixed'}>
                    <PageHeader
                        title={
                            <React.Fragment>
                                {logo && <span>{logo}</span>}
                                <Title level={4} style={{ marginBottom: 0, display: 'inline-block' }}>
                                    {title}
                                </Title>
                            </React.Fragment>
                        }
                        key="pageheader"
                        breadcrumb={{
                            itemRender,
                            routes: breadcrumbs,
                        }}
                        footer={renderFooter(restProps)}
                    >
                        <div className="detail">
                            <div className="main">
                                <div className="row">
                                    {content && <div className="content">{content}</div>}
                                    {extraContent && <div className="extraContent">{extraContent}</div>}
                                </div>
                            </div>
                        </div>
                    </PageHeader>
                </WideDiv>
            </WrapperDiv>
            {children ? (
                <ChildrenContentDiv>
                    <GridContent>{children}</GridContent>
                </ChildrenContentDiv>
            ) : null}
        </div>
    );
};

export default withRouter(PageHeaderWrapper) as any;
