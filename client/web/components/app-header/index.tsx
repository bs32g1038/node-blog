import { css } from '@emotion/css';
import React from 'react';
import { Link as UiLink } from '@chakra-ui/react';
import NavLink from '../nav-link';
import { HomeNav, NavA, SvgDiv } from './style';
import * as styles from './style';
import { SearchForm } from './search-form';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import { Button } from 'antd';
import { HomeOutlined, UserOutlined, BranchesOutlined } from '@ant-design/icons';
import { GithubIcon, RssIcon } from '../../icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { getOrCreateStore } from '@blog/client/redux/with-redux-store';
import { setTheme } from '@blog/client/redux/reducers/app';
import { ReactSVG } from 'react-svg';

export const AppHeader = (props) => {
    const colorMode = useSelector((state: RootState) => state.app.theme);
    const config = useSelector((state: RootState) => state.app.config);
    return (
        <styles.MainWrap>
            <HomeNav title={config.siteTitle}>
                <SvgDiv colorMode={colorMode}>
                    <ReactSVG src={config.siteLogo} />
                </SvgDiv>
                <h1>{config.siteTitle}</h1>
            </HomeNav>
            <styles.NavWrap>
                <NavLink href="/blog">
                    <NavA>
                        <HomeOutlined></HomeOutlined>
                        <span>首页</span>
                    </NavA>
                </NavLink>
                <NavLink href="/about">
                    <NavA>
                        <UserOutlined></UserOutlined>
                        <span>关于</span>
                    </NavA>
                </NavLink>
                <NavA href="/blog/rss">
                    <BranchesOutlined
                        className={css`
                            width: 16px;
                            height: 16px;
                            margin-top: 2px;
                            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                            &:hover {
                                transform: rotate(270deg);
                            }
                        `}
                    ></BranchesOutlined>
                    <span>Rss</span>
                </NavA>
            </styles.NavWrap>
            {/* <SearchForm></SearchForm> */}
            <Button
                type="text"
                onClick={() => {
                    getOrCreateStore().dispatch(setTheme(colorMode));
                }}
            >
                {colorMode === 'light' ? <MoonIcon w="24px" h="24px" /> : <SunIcon w="24px" h="24px" />}
            </Button>
            <UiLink display={['none', 'block']} href="https://github.com/bs32g1038" isExternal={true}>
                <GithubIcon name="github" w="24px" h="24px" fill="theme.header.fill"></GithubIcon>
            </UiLink>
        </styles.MainWrap>
    );
};
