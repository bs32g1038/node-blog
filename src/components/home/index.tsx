import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { normalize } from 'polished';
import React from 'react';
import { Link } from 'react-router-dom';
import siteInfo from '../../config/site-info';
import MeteorShower from './meteor-shower';

const HomeWrap = styled.div((_) => ({
    position: 'fixed',
    display: 'block',
    zIndex: 900,
    width: '100%',
    maxWidth: 'none',
    height: '100%',
    background: 'url(/public/images/bg1.jpg) top left no-repeat #666666',
    backgroundSize: 'cover',
    transition: 'all 2s ease'
}));

const BgMask = styled.div((_) => ({
    display: 'block',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: 'linear-gradient(140deg,rgba(64, 70, 100, 0.6) 20%, rgba(25, 23, 34, 0.8))',
}));

const MainWrap = styled.div((_) => ({
    maxWidth: '620px',
    margin: '0 auto',
    position: 'relative',
    bottom: 0,
    zIndex: 800,
    textAlign: 'center',
    color: '#fff',
    transform: 'translateY(50%)',
    '> p': {
        fontSize: '12px'
    }
}));

const AvatarWrap = styled.a((_) => ({
    'img': {
        width: '80px',
        borderRadius: '50%',
        border: '3px solid #FFF',
        backgroundColor: 'transparent'
    }
}));

const H1 = styled.h1((_) => ({
    '>a': {
        color: '#fff',
        textDecoration: 'none'
    }
}));

const Hr = styled.hr((_) => ({
    maxWidth: '160px',
    height: '1px',
    marginTop: '30px',
    marginBottom: '30px',
    border: 'none',
    backgroundImage: 'linear-gradient(0deg, transparent, #fff, transparent)'
}));

const Description = styled.p((_) => ({
    color: '#fff',
    '>a': {
        color: '#fff',
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
    'a': {
        display: 'block',
        position: 'relative',
        borderColor: '#FFF',
        color: '#FFF',
        textDecoration: 'none',
        fontSize: '14px',
        padding: '10px 20px',
        margin: '0 5px',
        border: '1px solid #fff',
        borderRadius: '30px',
        letterSpacing: '1px'
    }
}));

const ATag = styled(Link)((_) => ({
    display: 'block',
    position: 'relative',
    borderColor: '#FFF',
    color: '#FFF',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '10px 20px',
    margin: '0 5px',
    border: '1px solid #fff',
    borderRadius: '30px',
    letterSpacing: '1px'
}));

const Footer = styled.footer((_) => {
    return {
        color: '#FFF',
        fontSize: '12px',
        marginTop: '40px'
    };
});

const Canvas = styled.canvas((_) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    height: '100%',
    width: '100%'
}));

export default class Home extends React.Component<any, any> {
    public componentDidMount() {
        const cvs: any = document.getElementById('canvas');
        const ctx = cvs.getContext('2d');
        ctx.fillStyle = 'rgba(255, 255, 255, 0)';
        const meteorShower = new MeteorShower(cvs, ctx);
        meteorShower.start();
        const $home: any = document.getElementById('j_homePage');
        let cur: number = 0;
        const arr = ['/public/images/bg.jpg', '/public/images/bg2.jpg', '/public/images/bg1.jpg'];
        setInterval(() => {
            $home.style.backgroundImage = `url(${arr[cur]})`;
            cur < arr.length - 1 ? cur++ : (cur = 0);
        }, 8000);
    }
    public render() {
        return (
            <HomeWrap id="j_homePage">
                <Global styles={normalize()} />
                <Global
                    styles={{
                        body: {
                            background: '#f5f7f9',
                            color: '#444',
                            fontFamily: '-apple-system, Monda, PingFang SC, Microsoft YaHei, sans-serif',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            margin: 0
                        },
                    }}
                />
                <Canvas id="canvas" height="400px" width="1000px"></Canvas>
                <MainWrap>
                    <AvatarWrap>
                        <img src="/public/images/avatar.jpg" />
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
                            <ATag to="/blog">博客</ATag>
                        </LI>
                        <LI>
                            <ATag to="/blog/guestbook">留言</ATag>
                        </LI>
                        <LI>
                            <ATag to="/blog/links">友链</ATag>
                        </LI>
                        <LI>
                            <a href="http://music.lizc.me" rel="noopener noreferrer" target="_blank">音乐</a>
                        </LI>
                        <LI>
                            <a href={siteInfo.github} rel="noopener noreferrer" target="_blank">Github</a>
                        </LI>
                    </UL>
                    <Footer>Copyright © 2016-2019 {siteInfo.name} {siteInfo.icp}</Footer>
                </MainWrap>
                <BgMask></BgMask>
            </HomeWrap>
        );
    }
} 