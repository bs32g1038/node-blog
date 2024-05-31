import React from 'react';
import style from './style.module.scss';
import NavLink from '../nav-link';
import Link from '../link';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { GithubIcon, MoonIcon, RssIcon, SunIcon } from '@blog/client/web/icons';
import { RootState } from '@blog/client/redux/store';
import { setTheme } from '@blog/client/redux/store';
import { useFetchConfigQuery } from '@blog/client/web/api';
import { useAppDispatch } from '@blog/client/web/hooks/app';
import { SearchForm } from './search-form';
import clsx from 'clsx';
import LogoSvg from '../logo-svg';

export const AppHeader = () => {
    const dispatch = useAppDispatch();
    const { data: config } = useFetchConfigQuery();
    const theme = useSelector((state: RootState) => state.app.theme);
    return (
        <header className={style.appHeader}>
            <nav className={style.navbar}>
                <Link href="/blog" passHref={true} className={style.siteTitle}>
                    <LogoSvg className={style.siteTileSvgWrap}></LogoSvg>
                    <h1>{config?.siteTitle}</h1>
                </Link>
                <nav className={style.nav}>
                    <NavLink href="/blog" className={clsx(style.navA, 'active')}>
                        <HomeOutlined></HomeOutlined>
                        <span>首页</span>
                    </NavLink>
                    <a href="/blog/rss" target="_blank" className={style.navA}>
                        <RssIcon className={style.branche}></RssIcon>
                        <span>Rss</span>
                    </a>
                </nav>
                <div className={style.right}>
                    <SearchForm></SearchForm>
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
                    <a href="https://github.com/bs32g1038" target="__blank">
                        <GithubIcon name="github" width="24px" height="24px" className={style.githubIcon}></GithubIcon>
                    </a>
                </div>
            </nav>
        </header>
    );
};
