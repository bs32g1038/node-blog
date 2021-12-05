import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import defaultConfig from '@blog/client/configs/admin.default.config';
import menus from '@blog/client/configs/admin.menu.config';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import { HomeOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { getDefaultCollapsedSubMenus, getSelectedMenuKeys, getFlatMenuKeys } from '@blog/client/admin/utils/path.util';
import { ReactSVG } from 'react-svg';
import style from './style.module.scss';

import { Layout, Menu, Avatar, Button } from 'antd';
const { Sider } = Layout;

const MenuList = (props) => {
    const renderMenuItem = (
        item // item.route 菜单单独跳转的路由
    ) => (
        <Menu.Item key={item.path}>
            <Link href={(item.route || item.path) + (item.query || '')} passHref={true}>
                <a className={style.menuLinkA}>
                    {item.icon}
                    <span className="nav-text">{item.title}</span>
                </a>
            </Link>
        </Menu.Item>
    );
    return (
        <Menu {...props}>
            {menus &&
                menus
                    .filter((item) => item.title && !item.hidden)
                    .map((item) => {
                        return renderMenuItem(item);
                    })
                    .filter((item) => item)}
        </Menu>
    );
};

interface Props {
    collapsed: boolean;
}

const setMenuOpen = (props) => {
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
    localStorage.removeItem(defaultConfig.tokenKey);
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
    const menuClick = (e) => {
        setState((data) => ({
            ...data,
            selectedKey: Array.isArray(e.key) ? e.key : [e.key],
        }));
    };
    const openMenu = (v: any) => {
        setState((data) => ({
            ...data,
            openKey: Array.isArray(v) ? v : [v],
            firstHide: false,
        }));
    };
    useEffect(() => {
        setState((data) => ({
            ...data,
            firstHide: false,
            ...(setMenuOpen({ router }) as any),
        }));
    }, [1]);
    const { selectedKey, openKey, firstHide } = state;
    const data = JSON.parse(localStorage.getItem(defaultConfig.userInfoKey));
    const config = useSelector((state: RootState) => state.app.config);
    return (
        <div className={style.wrap}>
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
                    <div className={style.logo}>
                        <ReactSVG src={config.siteLogo} />
                        <h1>{config.siteTitle}</h1>
                    </div>
                </Link>
                <div className={style.userMenu}>
                    <Menu mode="inline">
                        <Menu.SubMenu
                            title={
                                <div className={style.userPanel}>
                                    <div className="avatar-wrap">
                                        <Avatar src={data.avatar} size={34} icon={<UserOutlined />} />
                                    </div>
                                    <div>
                                        <h2>{data.userName}</h2>
                                        <p>{data.account}</p>
                                    </div>
                                </div>
                            }
                        >
                            <Menu.Item>
                                <Link href="/admin/user/person" passHref={true}>
                                    <a>
                                        <SettingOutlined />
                                        <span>配置个人信息</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item onClick={() => logout()}>
                                <LogoutOutlined />
                                退出登录
                            </Menu.Item>
                            <Menu.Divider></Menu.Divider>
                        </Menu.SubMenu>
                    </Menu>
                </div>
                <div style={{ overflowY: 'auto' }}>
                    <div className={style.homeMenuItem}>
                        <Link href="/admin/site">
                            <Button>
                                <HomeOutlined></HomeOutlined>浏览网站
                            </Button>
                        </Link>
                    </div>
                    <div className={style.menuTip}>管理</div>
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
        </div>
    );
};
