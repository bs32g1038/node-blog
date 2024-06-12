import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import menus from '@blog/client/configs/admin.menu.config';
import Router, { useRouter } from 'next/router';
import { HomeOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { getDefaultCollapsedSubMenus, getSelectedMenuKeys, getFlatMenuKeys } from '@blog/client/admin/utils/path.util';
import style from './style.module.scss';
import { Layout, Menu, Avatar, Button, Image, Spin } from 'antd';
import { useFetchConfigQuery } from '@blog/client/web/api';
import { useLazyFetchUserInfoQuery } from '../../api';
import Cookies from 'js-cookie';

const { Sider } = Layout;

const MenuList = (props) => {
    const renderMenuItem = (
        item // item.route 菜单单独跳转的路由
    ) => ({
        label: (
            <Link href={(item.route || item.path) + (item.query || '')} passHref={true} className={style.menuLinkA}>
                {item.icon}
                <span className="nav-text">{item.title}</span>
            </Link>
        ),
    });
    return (
        <Menu
            {...props}
            items={
                menus &&
                menus
                    .filter((item) => item.title && !item.hidden)
                    .map((item) => {
                        return renderMenuItem(item);
                    })
                    .filter((item) => item)
            }
        ></Menu>
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
    Cookies.remove('mstoken');
    return Router.push('/admin/login');
};

export default function SiderMenu(props: Props) {
    const { collapsed } = props;
    const [fetchUserInfo, { data: user, isLoading: isFetchUserLoading }] = useLazyFetchUserInfoQuery();
    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);
    const [state, setState] = useState({
        mode: 'inline',
        openKey: [],
        selectedKey: [''],
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
    }, [router]);
    const { selectedKey, openKey, firstHide } = state;
    const { data: config } = useFetchConfigQuery();
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
                <Link href="/admin/content/articles">
                    <div className={style.logo}>
                        <Image preview={false} width={32} height={32} src={config.siteLogo} alt="" />
                        <h1>{config.siteTitle}</h1>
                    </div>
                </Link>
                <div className={style.userMenu}>
                    <Spin spinning={isFetchUserLoading}>
                        <Menu
                            mode="inline"
                            items={[
                                {
                                    key: '/admin/user',
                                    label: user && (
                                        <div className={style.userPanel}>
                                            <div className="avatar-wrap">
                                                <Avatar src={user.avatar} size={34} icon={<UserOutlined />} />
                                            </div>
                                            <div>
                                                <h2>{user.username}</h2>
                                                <p>{user.account}</p>
                                            </div>
                                        </div>
                                    ),
                                    children: [
                                        {
                                            key: '/admin/user/person',
                                            label: (
                                                <Link href="/admin/user/person" passHref={true}>
                                                    <SettingOutlined />
                                                    <span>配置个人信息</span>
                                                </Link>
                                            ),
                                        },
                                        {
                                            key: '/admin/user/logout',
                                            label: (
                                                <div onClick={() => logout()}>
                                                    <LogoutOutlined />
                                                    <span>退出登录</span>
                                                </div>
                                            ),
                                        },
                                    ],
                                },
                            ]}
                        ></Menu>
                    </Spin>
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
}
