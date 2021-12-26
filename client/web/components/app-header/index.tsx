import React from 'react';
import style from './style.module.scss';
import NavLink from '../nav-link';
import Link from '../link';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Skeleton } from 'antd';
import { SearchForm } from './search-form';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { GithubIcon, MoonIcon, RssIcon, SunIcon } from '../../icons';
import { ReactSVG } from 'react-svg';
import { RootState } from '@blog/client/redux/store';
import scrollIntoView from '@blog/client/web/utils/scroll.into.view';
import { setTheme } from '@blog/client/redux/store';
import { useFetchConfigQuery } from '@blog/client/web/api';

export const AppHeader = () => {
    const dispatch = useDispatch();
    const { data: config } = useFetchConfigQuery();
    const theme = useSelector((state: RootState) => state.app.theme);
    return (
        <header className={style.appHeader}>
            <Link href="/blog" passHref={true}>
                <a className={style.siteTitle}>
                    <div className={style.siteTileSvgWrap}>
                        <ReactSVG src={config.siteLogo} />
                    </div>
                    <h1>{config.siteTitle}</h1>
                </a>
            </Link>
            <nav className={style.nav}>
                <NavLink href="/blog">
                    <a className={style.navA}>
                        <HomeOutlined></HomeOutlined>
                        <span>首页</span>
                    </a>
                </NavLink>
                <a className={style.navA} onClick={() => scrollIntoView('app-footer')}>
                    <UserOutlined></UserOutlined>
                    <span>关于</span>
                </a>
                <NavLink href="/blog/rss" target="_blank">
                    <a className={style.navA}>
                        <RssIcon className={style.branche}></RssIcon>
                        <span>Rss</span>
                    </a>
                </NavLink>
            </nav>
            <SearchForm style={{ marginRight: '15px' }} />
            {theme === 'light' ? (
                <Button
                    type="link"
                    icon={<MoonIcon className={style.moonIcon}></MoonIcon>}
                    onClick={() => {
                        dispatch(setTheme({ theme: 'dark' }));
                    }}
                ></Button>
            ) : (
                <Button
                    type="link"
                    icon={<SunIcon className={style.sunIcon}></SunIcon>}
                    onClick={() => {
                        dispatch(setTheme({ theme: 'light' }));
                    }}
                ></Button>
            )}
            <a href="https://github.com/bs32g1038" target="__blank" style={{ marginLeft: '15px' }}>
                <GithubIcon name="github" width="24px" height="24px" className={style.githubIcon}></GithubIcon>
            </a>
        </header>
    );
};
