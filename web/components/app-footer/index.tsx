import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import siteInfo from '../../config/site-info';
import media from '../../utils/media';
import { GithubSvg } from '../svgs/github-svg';
import { HomeSvg } from '../svgs/home-svg';
import { UserSvg } from '../svgs/user-svg';
import NavLink from '../nav-link';
import * as theme from '../../theme';

const Footer = styled.footer`
    box-sizing: border-box;
    color: ${theme.textColorSecondary};
    flex: 0 0 auto;
    font-size: 12px;
    font-weight: normal;
    position: relative;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    width: 100%;
    .icon-icp {
        display: inline-block;
        vertical-align: middle;
        width: 15px;
        height: 15px;
        background: url(${require('../../assets/images/icp.png')}) no-repeat;
        background-size: 100%;
    }
    ${media.phone`
        width: 100%;
        margin-bottom: 50px;
    `};
`;

const P = styled.p`
    word-break: break-all;
    word-wrap: break-word;
    line-height: 1.8;
    margin: 0;
    > a {
        text-decoration: none;
        color: ${theme.textColor};
        font-weight: bolder;
    }
`;

const BackTopBtn = styled.div`
    color: #333;
    cursor: pointer;
    position: absolute;
    right: -40px;
    bottom: 40px;
    text-align: center;
    width: 44px;
    background: #fff;
    width: 40px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    svg {
        fill: #8590a6;
        vertical-align: middle;
    }
    ${media.phone`
        display: none;
    `};
`;

const MobileTabbar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
    z-index: 9000;
    display: none;
    ${media.phone`
        display: flex;
    `};
    .tabbar-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #7d7e80;
        font-size: 12px;
        line-height: 1;
        cursor: pointer;
        text-decoration: none;
        &.active {
            color: #1989fa;
        }
    }
    .tabbar-item__icon {
        position: relative;
        margin-bottom: 5px;
        font-size: 18px;
    }
`;

const HomeIcon = styled(HomeSvg)`
    fill: #2b414d;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const UserIcon = styled(UserSvg)`
    fill: #2b414d;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const GithubIcon = styled(GithubSvg)`
    fill: #2b414d;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const FooterRight = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const LibLink = styled.a`
    cursor: pointer;
`;

const LibLogo = styled.img`
    fill: #2b414d;
    width: 32px;
    height: 32px;
    cursor: pointer;
    margin: 0 6px;
`;

const Hr = styled.hr`
    width: 100%;
`;

const loadBackTopBtnEvent = () => {
    let timer: any = null;
    const backTopEl = document.getElementById('backTop');
    if (backTopEl) {
        backTopEl.onclick = () => {
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(function fn() {
                const t = document.documentElement && document.documentElement.scrollTop;
                const oTop = document.body.scrollTop || t || 0;
                if (oTop > 0) {
                    const p = oTop - 100;
                    if (document.documentElement) {
                        document.body.scrollTop = document.documentElement.scrollTop = p;
                    }
                    timer = requestAnimationFrame(fn);
                } else {
                    cancelAnimationFrame(timer);
                }
            });
        };
    }
};

/**
 * 底部时间计数逻辑实现
 */
const loadTimeCountEvent = () => {
    const time = document.getElementById('blog-runing-time');
    // 显示博客运行时间
    function showRunTime() {
        const BirthDay = new Date('2016/012/11 00:00:00');
        const today = new Date();
        const timeold = today.getTime() - BirthDay.getTime();
        const msPerDay = 864e5;
        const eDaysold = timeold / msPerDay;
        const daysold = Math.floor(eDaysold);
        const eHrsold = 24 * (eDaysold - daysold);
        const hrsold = Math.floor(eHrsold);
        const eMinsold = 60 * (eHrsold - hrsold);
        const minsold = Math.floor(60 * (eHrsold - hrsold));
        const seconds = Math.floor(60 * (eMinsold - minsold));
        if (time) {
            time.innerHTML = daysold + '天' + hrsold + '小时' + minsold + '分' + seconds + '秒';
        }
    }
    setInterval(showRunTime, 1000);
};

export const AppFooter = () => {
    useEffect(() => {
        loadBackTopBtnEvent();
        loadTimeCountEvent();
    });
    return (
        <React.Fragment>
            <Footer>
                <BackTopBtn title="返回顶部" id="backTop">
                    <svg data-title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path>
                    </svg>
                </BackTopBtn>
                <div>
                    <P>欢迎来到我的个人网站，这里主要分享前后端技术文章，致力于web技术研究。</P>
                    <P>
                        Powered by <strong>Nodejs</strong> <strong>nestjs</strong> <strong>react</strong>{' '}
                        <strong>antdesign</strong>
                    </P>
                    <P>
                        <span>累计运行</span>
                        <span id="blog-runing-time"></span>
                    </P>
                    <P>
                        <span>Copyright © 2016-2019</span>
                        <a className="text-white" href="/blog">
                            <strong> {siteInfo.name} </strong>
                        </a>
                        <span>
                            <a
                                style={{ textDecoration: 'none', color: '#444' }}
                                href={siteInfo.icpGovCn}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <span className="icon-icp"></span> {siteInfo.icp}{' '}
                            </a>
                        </span>
                    </P>
                </div>
                <FooterRight>
                    <P>
                        <LibLink href="https://nestjs.com" rel="noopener noreferrer" target="_blank">
                            <LibLogo src={require('../../assets/svgs/logo-nestjs.svg')} />
                        </LibLink>
                        <LibLink href="https://react.docschina.org" rel="noopener noreferrer" target="_blank">
                            <LibLogo src={require('../../assets/svgs/logo-react.svg')} />
                        </LibLink>
                        <LibLink href="https://nodejs.org/en" rel="noopener noreferrer" target="_blank">
                            <LibLogo src={require('../../assets/svgs/logo-nodejs.svg')} />
                        </LibLink>
                        <LibLink href="https://ant.design" rel="noopener noreferrer" target="_blank">
                            <LibLogo src={require('../../assets/svgs/logo-ant-design.svg')} />
                        </LibLink>
                    </P>
                    <Hr />
                    <P>
                        博客已开源至
                        <a
                            href={siteInfo.projectGithub}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="app-github"
                        >
                            Github
                        </a>
                        请大家多多关注
                    </P>
                </FooterRight>
            </Footer>
            <MobileTabbar id="mobile-app-footer">
                <NavLink href="/blog">
                    <a className="tabbar-item">
                        <div className="tabbar-item__icon">
                            <HomeIcon></HomeIcon>
                        </div>
                        <div className="tabbar-item__text">博客</div>
                    </a>
                </NavLink>
                <NavLink href="/about">
                    <a className="tabbar-item">
                        <div className="tabbar-item__icon">
                            <UserIcon></UserIcon>
                        </div>
                        <div className="tabbar-item__text">关于</div>
                    </a>
                </NavLink>
                <a className="tabbar-item" href={siteInfo.github} rel="noopener noreferrer" target="_blank">
                    <div className="tabbar-item__icon">
                        <GithubIcon></GithubIcon>
                    </div>
                    <div className="tabbar-item__text">Gituhub</div>
                </a>
            </MobileTabbar>
        </React.Fragment>
    );
};
