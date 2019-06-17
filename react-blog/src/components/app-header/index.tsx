import styled from '@emotion/styled';
import { transitions } from 'polished';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import media from '../../utils/media';

const Container = styled.header`
    align-items: center;
    background: #fff;
    /* box-shadow: 0 2px 2px 0 rgba(0,0,0,.1); */
    border-bottom: 1px solid #f1f1f1;
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
    `};
    img{
        width: auto;
        height: 40px;
    }
`;

const H1 = styled.h1`
    ${transitions('color .15s ease')};
    text-align: center;
    margin: 0;
    font-size: 16px;
    ${media.phone`
        padding-left: 5px;
        width: 100%;
    `};
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
        >i {
            display: block;
            padding-right: 20px;
        }
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

const SearchForm = styled.form`
    border: 1px solid hsla(0,0%,59.2%,.2);
    background-color: rgba(227,231,236,.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 2px;
    .search-input{
        border: none;
        width: 150px;
        padding: 7.2px 12px;
        box-shadow: none;
        outline: none;
        font-size: 14px;
        color: #666;
        background-color: transparent;
        -webkit-appearance: textfield;
        outline-offset: -2px;
    }
    .search-icon{
        color: #666;
        padding: 0 8px;
        cursor: pointer;
    }
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
                    <HomeNav to="/" title={siteInfo.name}>
                        <img src={require('../../assets/images/logo.png')} alt={siteInfo.name} />
                        {/* <H1>{siteInfo.name}</H1> */}
                    </HomeNav>
                    <Menu>
                        <i className={this.state.isShowMobileMenu ? 'fa fa-times' : 'fa fa-reorder'} onClick={() => this.showMenu()}></i>
                        <UL style={this.state.isShowMobileMenu ? { display: 'block' } : {}}>
                            <LI>
                                <ATag to="/blog">
                                    {/* <i className="fa fa-home fa-fw"></i> */}
                                    博客
                                </ATag>
                            </LI>
                            {/* <span> · </span> */}
                            {/* <LI>
                                <ATag to="/links">
                                    <i className="fa fa-globe fa-fw"></i>友链
                                </ATag>
                            </LI> */}
                            {/* <span> · </span> */}
                            <LI>
                                <ATag to="/about">
                                    {/* <i className="fa fa-user fa-fw"></i> */}
                                    关于
                                </ATag>
                            </LI>
                            {/* <span> · </span> */}
                            <LI>
                                <a className="rss" href="http://music.lizc.me" rel="noopener noreferrer" target="_blank">
                                    {/* <i className="fa fa-coffee fa-fw"></i> */}
                                    音乐
                                </a>
                            </LI>
                            {/* <span> · </span> */}
                            <LI>
                                <a className="rss" href="/blog/rss" rel="noopener noreferrer" target="_blank">
                                    {/* <i className="fa fa-rss fa-fw"></i> */}
                                    Rss
                                </a>
                            </LI>
                            {/* <LI>
                                <a className="rss" href="https://github.com/bs32g1038" rel="noopener noreferrer" target="_blank">
                                    <i className="fa fa-github fa-fw"></i>Github
                                </a>
                            </LI> */}
                        </UL>
                    </Menu>
                    <UL>
                        <LI>
                            <SearchForm>
                                <input type="search" maxLength={32} placeholder="搜索更新啦" className="search-input" />
                                <i className="fa fa-search fa-fw search-icon"></i>
                            </SearchForm>
                        </LI>
                        <LI>
                            <a className="rss" href="https://github.com/bs32g1038" rel="noopener noreferrer" target="_blank">
                                <i className="fa fa-github fa-fw github" style={{ fontSize: '24px' }}></i>
                            </a>
                        </LI>
                    </UL>
                </MainWrap>
            </Container>
        );
    }
}