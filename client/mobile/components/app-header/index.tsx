import React from 'react';
import style from './style.module.scss';
import NavLink from '../nav-link';
import Link from '../link';
import { useSelector } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { GithubIcon, MoonIcon, RssIcon, SunIcon } from '@blog/client/web/icons';
import { RootState } from '@blog/client/redux/store';
import { setTheme } from '@blog/client/redux/store';
import { useFetchConfigQuery } from '@blog/client/web/api';
import { useAppDispatch } from '@blog/client/web/hooks/app';
import clsx from 'clsx';
import LogoSvg from '../logo-svg';

export const AppHeader = () => {
    const dispatch = useAppDispatch();
    const { data: config } = useFetchConfigQuery();
    const theme = useSelector((state: RootState) => state.app.theme);
    return (
        <header className={style.appHeader}>
            <nav className={style.navbar}>
                <Link href="/m/blog" passHref={true} className={style.siteTitle}>
                    <LogoSvg className={style.siteTileSvgWrap}></LogoSvg>
                    <h1>{config?.siteTitle}</h1>
                </Link>
                <nav className={style.nav}>
                    <NavLink href="/m/blog" className={clsx(style.navA, 'active')}>
                        <HomeOutlined></HomeOutlined>
                    </NavLink>
                    <a href="/m/blog/rss" target="_blank" className={style.navA}>
                        <RssIcon className={style.branche}></RssIcon>
                    </a>
                </nav>
                <div className={style.right}>
                    {theme === 'light' ? (
                        <MoonIcon
                            className={style.moonIcon}
                            onClick={() => {
                                dispatch(setTheme({ theme: 'dark' }));
                            }}
                        ></MoonIcon>
                    ) : (
                        <SunIcon
                            className={style.sunIcon}
                            onClick={() => {
                                dispatch(setTheme({ theme: 'light' }));
                            }}
                        ></SunIcon>
                    )}
                    <a href="https://github.com/bs32g1038" target="__blank">
                        <GithubIcon name="github" width="18px" height="18px" className={style.githubIcon}></GithubIcon>
                    </a>
                </div>
            </nav>
        </header>
    );
};
