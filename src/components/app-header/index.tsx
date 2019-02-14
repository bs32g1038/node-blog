import styled from '@emotion/styled';
import { transitions } from 'polished';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { color } from '../../config/theme';
import media from '../../utils/media';

const Container = styled.header`
    align-items: center;
    background-color: #f9f9f9;
    background-size: cover;
    @font-face{
        font-family: paopaoyuFont;
        src: url('/public/fonts/subfont.ttf')
    }
`;

const MainWrap = styled.div`
    position: relative;
    bottom: 0;
    text-align: center;
    color: #555;
    display: flex;
    justify-content: space-between;
    width: 720px;
    margin: 0 auto;
    align-items: center;
    padding: 10px 0;
    > p {
        font-size: '12px'
    }
    ${media.phone`
        width: 100%;
    `};
`;

const HomeNav = styled(Link)`
    text-decoration: none;
    color: #555;
    font-size: 16px;
`;

const H1 = styled.h1`
    ${transitions('color .15s ease')};
    text-align: center;
    margin: 0;
    font-size: 16px;
    font-family: paopaoyuFont;
    ${media.phone`
        padding-left: 5px;
        width: 100%;
    `};
`;

const Menu = styled.div`
    overflow: hidden;
    transition: all .4s ease;
    >i {
        font-size: 16px;
        display: none
    }
    ${media.phone`
        >i {
            display: block;
            padding-right: 20px;
        }
    `};
`;

const UL = styled.ul`
    display: inline-block;
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
    display: inline-block;
    line-height: 1em;
`;

const ATag = styled(Link)`
    display: block;
    position: relative;
    text-decoration: none;
    font-size: 14px;
    padding: 10px 10px;
    border-radius: 30px;
    letter-spacing: 1px;
    color: #555;
`;

export interface AppHeaderProps {
    siteInfo: {
        github: string,
        name: string
    };
}

interface AppHeaderState {
    isShowMobileMenu: boolean;
}

export default class AppHeader extends Component<AppHeaderProps, AppHeaderState> {
    public state = {
        isShowMobileMenu: false
    };
    public showMenu() {
        this.setState({
            isShowMobileMenu: !this.state.isShowMobileMenu
        });
    }
    public render() {
        const { siteInfo } = this.props;
        return (
            <Container>
                <MainWrap>
                    <HomeNav to="/" title="Lizc的个人网站">
                        <H1>Lizc的个人日志</H1>
                    </HomeNav>
                    <Menu>
                        <i className={this.state.isShowMobileMenu ? 'fa fa-times' : 'fa fa-reorder'} onClick={() => this.showMenu()}></i>
                        <UL style={this.state.isShowMobileMenu ? { display: 'block' } : {}}>
                            <LI>
                                <ATag to="/blog">
                                    <i className="fa fa-home fa-fw"></i>博客
                                </ATag>
                            </LI>
                            <span> · </span>
                            <LI>
                                <ATag to="/blog/guestbook">
                                    <i className="fa fa-coffee fa-fw"></i>留言
                                </ATag>
                            </LI>
                            <span> · </span>
                            <LI>
                                <ATag to="/blog/links">
                                    <i className="fa fa-globe fa-fw"></i>友链
                                </ATag>
                            </LI>
                            <span> · </span>
                            <LI>
                                <ATag to="/blog/about">
                                    <i className="fa fa-user fa-fw"></i>关于
                                </ATag>
                            </LI>
                            <span> · </span>
                            <LI>
                                <ATag to="/blog/rss">
                                    <i className="fa fa-rss fa-fw"></i>Rss
                                </ATag>
                            </LI>
                        </UL>
                    </Menu>
                </MainWrap>
            </Container>
        );
    }
}