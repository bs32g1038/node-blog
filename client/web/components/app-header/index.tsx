import React from 'react';
import style from './style.module.scss';
import NavLink from '../nav-link';
import Link from '../link';
// import { SearchForm } from './search-form';
import { useSelector } from 'react-redux';
// import { RootState } from '@blog/client/redux/store';
import { Button } from 'antd';
import { SearchForm } from './search-form';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { GithubIcon, RssIcon } from '../../icons';
// import { getOrCreateStore } from '@blog/client/redux/with-redux-store';
// import { setTheme } from '@blog/client/redux/reducers/app';
import { ReactSVG } from 'react-svg';
import { RootState } from '@blog/client/redux/store';
import scrollIntoView from '@blog/client/web/utils/scroll.into.view';

export const AppHeader = () => {
    const config = useSelector((state: RootState) => state.app.config);
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
                <NavLink href="/about">
                    <a className={style.navA}>
                        <RssIcon className={style.branche}></RssIcon>
                        <span>Rss</span>
                    </a>
                </NavLink>
            </nav>
            <SearchForm />
            <Button type="text">🌙</Button>
            <a href="https://github.com/bs32g1038" target="__blank">
                <GithubIcon name="github" width="24px" height="24px" className={style.githubIcon}></GithubIcon>
            </a>
        </header>
    );
};
