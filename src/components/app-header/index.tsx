import styled from '@emotion/styled';
import { margin, padding, rem, transitions } from 'polished';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { color } from '../../config/theme';
// import isMobile from '../../utils/is-mobile';

const Container = styled.header((props) => ({
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 999,
    label: 'app-header',
    width: '240px',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0
}));

const NavWrap = styled.nav((props) => ({
    flex: '1 0 auto',
    textAlign: 'right',
    ...margin(0)
}));

const NavA = styled.a(() => ({
    display: 'inline-block',
    fontSize: rem(color.fontSizeBase),
    verticalAlign: 'middle',
    textDecoration: 'none',
    ...padding(0),
    ...transitions('color .15s ease'),
    position: 'fixed',
    right: 0,
    top: 0,
    lineHeight: 0,
    '&:hover': {
        color: '#61B3E6'
    },
}));

const Svg = styled.svg((_) => ({
    color: '#fff',
    fill: '#42b983',
    height: '50px',
    width: '50px'
}));

const Pannel = styled.div((_) => ({
    height: '40px',
    width: '100%',
    ':after': {
        content: '" "',
        position: 'absolute',
        WebkitBorderRadius: '50%',
        borderRadius: '50%',
        background: '#fc625d',
        width: '12px',
        height: '12px',
        top: 0,
        left: '20px',
        marginTop: '13px',
        WebkitBoxShadow: '20px 0px #fdbc40, 40px 0px #35cd4b',
        boxShadow: '20px 0px #fdbc40, 40px 0px #35cd4b',
        zIndex: 3
    }
}));

const MainWrap = styled.div((_) => ({
    position: 'relative',
    bottom: 0,
    zIndex: 800,
    textAlign: 'center',
    color: '#333',
    marginTop: '20px',
    '> p': {
        fontSize: '12px'
    }
}));

const AvatarWrap = styled.a((_) => ({
    display: 'block',
    'img': {
        width: '80px',
        borderRadius: '50%',
        border: '3px solid #FFF',
        backgroundColor: 'transparent'
    }
}));

const H1 = styled.h1((props) => ({
    ...transitions('color .15s ease'),
    textAlign: 'center',
    margin: 0,
    '>a': {
        textDecoration: 'none',
        color: '#333',
        fontSize: '16px'
    }
}));

// const H1 = styled.h1((_) => ({
//     '>a': {
//         color: '#fff',
//         textDecoration: 'none'
//     }
// }));

const Hr = styled.hr((_) => ({
    maxWidth: '160px',
    height: '1px',
    marginTop: '20px',
    marginBottom: '20px',
    border: 'none',
    backgroundImage: 'linear-gradient(0deg, transparent, #333, transparent)'
}));

const Description = styled.p((_) => ({
    '>a': {
        textDecoration: 'none'
    }
}));

const UL = styled.ul((_) => ({
    display: 'inline-block',
    position: 'relative',
    margin: '0',
    listStyleType: 'none',
    textAlign: 'center',
    padding: 0
}));

const LI = styled.li((_) => ({
    display: 'inline-block',
    margin: '5px 1px 0 0',
    lineHeight: '1em',
    width: '50%'
}));

const ATag = styled(Link)((_) => ({
    display: 'block',
    position: 'relative',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '30px',
    letterSpacing: '1px',
    color: '#333'
}));

export interface AppHeaderProps {
    siteInfo: {
        github: string,
        name: string
    };
}

interface AppHeaderState {
    isMobile: boolean;
}

export default class AppHeader extends Component<AppHeaderProps, AppHeaderState> {
    // state = {
    //     isMobile: false
    // }
    // componentDidMount() {
    //     this.setState({
    //         isMobile: isMobile()
    //     })
    // }
    public render() {
        const { siteInfo } = this.props;
        return (
            <Container>
                <Pannel></Pannel>
                <MainWrap>
                    <AvatarWrap>
                        <img src="/static/images/avatar.jpg" />
                    </AvatarWrap>
                    <H1>
                        <Link to="/" title="Lizc的个人网站">
                            Lizc的个人网站
                        </Link>
                    </H1>
                    <Description>哈喽！我是李成 (@lee)，一名 web developer 开发者。专注于前端开发。</Description>
                    <Hr />
                    <UL>
                        <LI>
                            <ATag to="/blog">
                                <i className="fa fa-home fa-fw"></i>博客
                            </ATag>
                        </LI>
                        <LI>
                            <ATag to="/blog/guestbook">
                                <i className="fa fa-coffee fa-fw"></i>留言
                            </ATag>
                        </LI>
                        <LI>
                            <ATag to="/blog/links">
                                <i className="fa fa-globe fa-fw"></i>友链
                            </ATag>
                        </LI>
                        <LI>
                            <ATag to="/blog/rss">
                                <i className="fa fa-rss fa-fw"></i>Rss
                            </ATag>
                        </LI>
                    </UL>
                </MainWrap>
                <NavA href={siteInfo.github} rel="noopener noreferrer" target="_blank">
                    <Svg viewBox="0 0 250 250" aria-hidden="true">
                        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"></path>
                        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor"></path>
                    </Svg>
                </NavA>
                {/* <H1>
                    <NavLink to="/blog"><i className="fa fa-envira fa-fw"></i>{siteInfo.name}</NavLink>
                </H1> */}
                {/* <NavWrap>
                    <NavLink to="/blog"><i className="fa fa-home fa-fw"></i>首页</NavLink>
                    <NavLink to="/blog/guestbook"><i className="fa fa-coffee fa-fw"></i>留言</NavLink>
                    <NavLink to="/blog/links"><i className="fa fa-globe fa-fw"></i>友链</NavLink>
                    <NavA href="javasript:;"><i className="fa fa-search fa-fw"></i>搜索</NavA>
                    <NavA href="/RSS" rel="noopener noreferrer" target="_blank"><i className="fa fa-rss fa-fw"></i>RSS</NavA>
                    <NavA github={true} href={siteInfo.github} rel="noopener noreferrer" target="_blank">
                        <Svg viewBox="0 0 250 250" aria-hidden="true">
                            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                            <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"></path>
                            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor"></path>
                        </Svg>
                    </NavA>
                </NavWrap> */}
            </Container>
        );
    }
}