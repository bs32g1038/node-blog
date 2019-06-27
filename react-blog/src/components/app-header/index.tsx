import styled from '@emotion/styled';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GithubSvg } from '../svgs/github-svg';
import { SearchForm } from './search-form';

import isMobile from '../../utils/is-mobile';
import media from '../../utils/media';

const Container = styled.header`
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    ${media.phone`
        font-size: 18px;
        border: none;
        box-shadow: 0px 1px 3px 0px rgba(17, 58, 93, 0.1);
        margin-bottom: 10px;
        .search-form {
            margin: 0 20px 0 0;
            width: 100%;
            input{
                width: 100%;
            }
        }
    `};
`;

const MainWrap = styled.div`
    position: relative;
    bottom: 0;
    text-align: center;
    color: #555;
    display: flex;
    justify-content: space-between;
    width: 960px;
    margin: 0 auto;
    align-items: center;
    height: 60px;
    > p {
        font-size: '12px'
    }
    ${media.phone`
        width: 100%;
        height: 44px;
    `};
`;

const HomeNav = styled(NavLink)`
    display: flex;
    text-decoration: none;
    color: #555;
    font-size: 16px;
    align-items: center;
    margin-right: 24px;
    ${media.phone`
        margin-left: 10px;
        span{
            font-size: 14px;
            color: #333;
            text-align: center;
            font-weight: 700;
        }
    `};
    img{
        width: auto;
        height: 40px;
        ${media.phone`
            display: none;
        `};
    }
`;

const Menu = styled.div`
    overflow: hidden;
    transition: all .4s ease;
    display: flex;
    flex: 1 0 auto;
    justify-content: flex-start;
    height: 100%;
    >i {
        font-size: 16px;
        display: none
    }
    ${media.phone`
        display: none;
    `};
`;

const UL = styled.ul`
    display: flex;
    position: relative;
    margin: 0;
    list-style-type: none;
    text-align: center;
    padding: 0;
    ${media.phone`
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        text-align: left;
        background-color: #f9f9f9;
        display: none;
        z-index: 1000;
        li{
            display: block;
            width: 100%;
        }
        span{
            display: none;
        }
    `};
`;

const LI = styled.li`
    display: flex;
    align-items: center;
    line-height: 1em;
    margin-left: 18px;
    margin-right: 18px;
    .rss {
        display: block;
        position: relative;
        text-decoration: none;
        font-size: 14px;
        border-radius: 30px;
        letter-spacing: 1px;
        color: #555;
    }
    .github{
        color: #f86422;
    }
`;

const ATag = styled(NavLink)`
    display: block;
    position: relative;
    text-decoration: none;
    font-size: 16px;
    color: #555;
    &.active{
        color: #f86422;
    }
`;

const GithubIcon = styled(GithubSvg)`
    fill:#2B414D;
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

export interface AppHeaderProps {
    siteInfo: {
        github: string,
        name: string
    };
}

export const AppHeader = (props: AppHeaderProps) => {
    const { siteInfo } = props;
    const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
    const showMenu = () => {
        setIsShowMobileMenu(!isShowMobileMenu);
    };
    return (
        <Container>
            <MainWrap>
                <HomeNav to="/" title={siteInfo.name}>
                    <img src={require('../../assets/images/logo.png')} alt={siteInfo.name} />
                    <span>{siteInfo.name}</span>
                </HomeNav>
                {
                    isMobile ? 
                    <SearchForm></SearchForm>
                    :
                    <>
                        <Menu>
                            <UL style={isShowMobileMenu ? { display: 'block' } : {}}>
                                <LI><ATag to="/blog">博客</ATag></LI>
                                <LI><ATag to="/about">关于</ATag></LI>
                                <LI>
                                    <a className="rss" href="http://music.lizc.me" rel="noopener noreferrer" target="_blank">
                                        音乐
                                    </a>
                                </LI>
                                <LI>
                                    <a className="rss" href="/blog/rss" rel="noopener noreferrer" target="_blank">
                                        Rss
                                    </a>
                                </LI>
                            </UL>
                        </Menu>
                        <UL>
                            <LI>
                                <SearchForm></SearchForm>
                            </LI>
                            <LI>
                                <a className="rss" href="https://github.com/bs32g1038" rel="noopener noreferrer" target="_blank">
                                    <GithubIcon />
                                </a>
                            </LI>
                        </UL>
                    </>
                }
            </MainWrap>
        </Container>
    );
};