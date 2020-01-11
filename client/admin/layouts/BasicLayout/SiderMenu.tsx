import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import { Legacy } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import styled from '@emotion/styled';
import IconLogo from '@blog/client/admin/assets/logo.svg';
import config from '@blog/client/admin/configs/default.config';
import menus from '@blog/client/admin/configs/menu-config';
import { getDefaultCollapsedSubMenus, getSelectedMenuKeys, getFlatMenuKeys } from './util';
import { useRouter } from 'next/router';

const WrapDiv = styled.div`
    .ant-menu-light {
        border-right-color: transparent;
    }
`;

const LogoDiv = styled.div`
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    height: 64px;
    padding-left: 24px;
    line-height: 64px;
    cursor: pointer;
    background: #fff;
    box-shadow: 1px 1px 0 0 #e8e8e8;
    a {
        color: #1890ff;
    }
    img {
        display: inline-block;
        height: 32px;
        vertical-align: middle;
    }
    @font-face {
        font-family: 'zixinfangmeng';
        src: url(${require('./ZiXinFangMengTi-2-subfont.ttf')}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    h1 {
        display: inline-block;
        margin: 0 0 0 12px;
        color: #444;
        font-weight: 600;
        font-size: 18px;
        font-family: zixinfangmeng;
        vertical-align: middle;
    }
`;

const MenuList = props => {
    const renderMenuItem = (
        item // item.route 菜单单独跳转的路由
    ) => (
        <Menu.Item key={item.path}>
            <Link href={(item.route || item.path) + (item.query || '')} passHref={true}>
                <a>
                    {item.icon}
                    <span className="nav-text">{item.title}</span>
                </a>
            </Link>
        </Menu.Item>
    );
    const renderSubMenu = item => (
        <Menu.SubMenu
            key={item.path}
            title={
                <span>
                    {item.icon}
                    <span className="nav-text">{item.title}</span>
                </span>
            }
        >
            {item.childMenus
                .filter(item => item.title && !item.hideInMenu)
                .map(item => renderMenuItem(item))
                .filter(item => item)}
        </Menu.SubMenu>
    );
    return (
        <Menu {...props}>
            {menus &&
                menus
                    .filter(item => item.title)
                    .map(item => {
                        return renderSubMenu(item);
                    })
                    .filter(item => item)}
        </Menu>
    );
};

interface Props {
    collapsed: boolean;
}

const setMenuOpen = props => {
    const { pathname } = props.router;
    const flatMenuKeys = getDefaultCollapsedSubMenus({ ...props, flatMenuKeys: getFlatMenuKeys(menus) });
    return {
        openKey: getDefaultCollapsedSubMenus({
            ...props,
            flatMenuKeys: flatMenuKeys.slice(1, flatMenuKeys.length - 1),
        }),
        selectedKey: getSelectedMenuKeys(flatMenuKeys, pathname),
    };
};

export default (props: Props) => {
    const { collapsed } = props;
    const [state, setState] = useState({
        mode: 'inline',
        openKey: [],
        selectedKey: '',
        firstHide: true,
    });
    const router = useRouter();
    const menuClick = e => {
        setState(data => ({
            ...data,
            selectedKey: Array.isArray(e.key) ? e.key : [e.key],
        }));
    };
    const openMenu = (v: any) => {
        setState(data => ({
            ...data,
            openKey: Array.isArray(v) ? v : [v],
            firstHide: false,
        }));
    };
    useEffect(() => {
        setState(data => ({
            ...data,
            firstHide: false,
            ...(setMenuOpen({ router }) as any),
        }));
    }, [1]);
    const { selectedKey, openKey, firstHide } = state;
    return (
        <WrapDiv>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
                width={240}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    zIndex: 10,
                    boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
                }}
            >
                <Link href="/admin/dashboard/analysis" passHref={true}>
                    <LogoDiv>
                        <img src={IconLogo} />
                        <h1>{config.title}</h1>
                    </LogoDiv>
                </Link>
                <MenuList
                    theme="light"
                    mode={collapsed ? 'vertical' : 'inline'}
                    key="Menu"
                    onClick={menuClick}
                    selectedKeys={selectedKey}
                    openKeys={firstHide ? null : openKey}
                    onOpenChange={openMenu}
                ></MenuList>
            </Sider>
        </WrapDiv>
    );
};
