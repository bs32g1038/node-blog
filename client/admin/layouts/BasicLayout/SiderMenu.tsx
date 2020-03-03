import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout, Menu, Avatar, Button } from 'antd';
const { Sider } = Layout;
import styled from '@emotion/styled';
import IconLogo from '@blog/client/admin/assets/logo.svg';
import config from '@blog/client/admin/configs/default.config';
import menus from '@blog/client/admin/configs/menu-config';
import { getDefaultCollapsedSubMenus, getSelectedMenuKeys, getFlatMenuKeys } from './util';
import Router, { useRouter } from 'next/router';
import { HomeOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';

const WrapDiv = styled.div`
    .ant-menu-light {
        border-right-color: transparent;
    }
    .ant-menu-item {
        padding-left: 36px;
    }
    .ant-dropdown-link {
        display: flex;
        align-items: center;
    }
    .ant-layout-sider-children {
        display: flex;
        flex-direction: column;
    }
`;

const LogoDiv = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 24px 0px 11px;
    margin: 0px 20px;
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
        font-size: 16px;
        font-family: zixinfangmeng;
        vertical-align: middle;
    }
`;

const HomeMenuItem = styled.div`
    margin: 10px 0px;
    display: flex;
    justify-content: center;
    button {
        width: 100%;
        align-items: center;
        display: flex;
        align-items: center;
        color: rgb(62, 75, 80);
        font-weight: 400;
        padding: 6px 32px;
        transition: none 0s ease 0s;
        margin: 2px 5px;
        border-radius: 5px;
        border: none;
        background-color: #fff;
        box-shadow: none;
        &:hover {
            box-shadow: none;
            color: inherit;
            background-color: rgba(0, 0, 0, 0.05);
        }
    }
`;

const MenuTip = styled.div`
    padding-left: 26px;
    padding-top: 10px;
    padding-bottom: 10px;
`;

const MenuLinkA = styled.a`
    padding-left: 13px;
`;

const UserMenu = styled.div`
    .ant-menu-inline {
        border-right: none !important;
    }
    .ant-menu-submenu {
        .ant-menu-sub {
            background-color: rgb(245, 245, 245);
        }
        .ant-menu-submenu-title {
            height: auto;
        }
    }
    .ant-menu-item:active,
    .ant-menu-submenu-title:active {
        background: transparent;
    }
`;

const UserPanel = styled.div`
    margin: 10px 5px 10px;
    display: flex;
    align-items: center;
    padding: 5px 0;
    user-select: none;
    line-height: 1.5;
    h2 {
        margin: 0;
        font-weight: 600;
        padding: 0px 0px 3px;
        font-size: 14px;
    }
    p {
        font-size: 13px;
        font-weight: 400;
        color: rgb(84, 102, 109);
        margin: -1px 8px -3px 0px;
    }
    .avatar-wrap {
        margin: 0px 8px 0px 0px;
        .anticon-user {
            margin-right: 0;
        }
    }
`;

const MenuList = props => {
    const renderMenuItem = (
        item // item.route 菜单单独跳转的路由
    ) => (
        <Menu.Item key={item.path}>
            <Link href={(item.route || item.path) + (item.query || '')} passHref={true}>
                <MenuLinkA>
                    {item.icon}
                    <span className="nav-text">{item.title}</span>
                </MenuLinkA>
            </Link>
        </Menu.Item>
    );
    return (
        <Menu {...props}>
            {menus &&
                menus
                    .filter(item => item.title && !item.hidden)
                    .map(item => {
                        return renderMenuItem(item);
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

const logout = () => {
    localStorage.removeItem(config.tokenKey);
    return Router.push('/admin/login');
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
    const data = JSON.parse(localStorage.getItem(config.userInfoKey));
    return (
        <WrapDiv>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
                width={267}
                style={{
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 10,
                    boxShadow: 'none',
                }}
            >
                <Link href="/admin/dashboard">
                    <LogoDiv>
                        <img src={IconLogo} />
                        <h1>{config.title}</h1>
                    </LogoDiv>
                </Link>
                <UserMenu>
                    <Menu mode="inline">
                        <Menu.SubMenu
                            title={
                                <UserPanel>
                                    <div className="avatar-wrap">
                                        <Avatar src={data.avatar} size={34} icon={<UserOutlined />} />
                                    </div>
                                    <div>
                                        <h2>{data.userName}</h2>
                                        <p>{data.account}</p>
                                    </div>
                                </UserPanel>
                            }
                        >
                            <Menu.Item>
                                <Link href="/admin/user/person" passHref={true}>
                                    <a>
                                        <SettingOutlined />
                                        配置个人信息
                                    </a>
                                </Link>
                                <SettingOutlined />
                                配置个人信息
                            </Menu.Item>
                            <Menu.Item onClick={() => logout()}>
                                <LogoutOutlined />
                                退出登录
                            </Menu.Item>
                            <Menu.Divider></Menu.Divider>
                        </Menu.SubMenu>
                    </Menu>
                </UserMenu>
                <div style={{ overflowY: 'auto' }}>
                    <HomeMenuItem>
                        <Link href="/admin/site">
                            <Button>
                                <HomeOutlined></HomeOutlined>浏览网站
                            </Button>
                        </Link>
                    </HomeMenuItem>
                    <MenuTip>管理</MenuTip>
                    <MenuList
                        theme="light"
                        mode={collapsed ? 'vertical' : 'inline'}
                        style={{ marginBottom: '25px' }}
                        key="Menu"
                        onClick={menuClick}
                        selectedKeys={selectedKey}
                        openKeys={firstHide ? null : openKey}
                        onOpenChange={openMenu}
                    ></MenuList>
                </div>
            </Sider>
        </WrapDiv>
    );
};
