import React from 'react';
import { PageHeader, Tabs, Typography } from 'antd';
import classNames from 'classnames';
import GridContent from './GridContent';
import styles from './index.module.scss';
import { generateBreadcrumbList } from './breadcrumb';
import MenuContext from '../../layouts/MenuContext';
const { Title } = Typography;

const renderFooter = ({ tabList, tabActiveKey, onTabChange, tabBarExtraContent }) => {
    return tabList && tabList.length ? (
        <Tabs
            className={styles.tabs}
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


const PageHeaderWrapper = ({
    children,
    contentWidth,
    fluid,
    wrapperClassName,
    home,
    top,
    title,
    content,
    logo,
    extraContent,
    hiddenBreadcrumb,
    ...restProps
}) => {
    return (
        <div style={{ margin: '-24px -24px 0' }} className={classNames(wrapperClassName, styles.main)}>
            {top}
            <MenuContext.Consumer>
                {value => {
                    return (<div className={styles.wrapper}>
                        <div
                            className={classNames({
                                [styles.wide]: !fluid && contentWidth === 'Fixed',
                            })}
                        >
                            <PageHeader
                                title={
                                    <>
                                        {logo && <span className={styles.logo}>{logo}</span>}
                                        <Title
                                            level={4}
                                            style={{
                                                marginBottom: 0,
                                                display: 'inline-block',
                                            }}
                                        >
                                            {title}
                                        </Title>
                                    </>
                                }
                                key="pageheader"
                                {...restProps}
                                breadcrumb={generateBreadcrumbList(value)}
                                className={styles.pageHeader}
                                footer={renderFooter(restProps)}
                            >
                                <div className={styles.detail}>
                                    <div className={styles.main}>
                                        <div className={styles.row}>
                                            {content && <div className={styles.content}>{content}</div>}
                                            {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
                                        </div>
                                    </div>
                                </div>
                            </PageHeader>
                        </div>
                    </div>)
                }}
            </MenuContext.Consumer>
            {children ? (
                <div className={styles['children-content']}>
                    <GridContent>{children}</GridContent>
                </div>
            ) : null}
        </div>
    );
};

export default PageHeaderWrapper;