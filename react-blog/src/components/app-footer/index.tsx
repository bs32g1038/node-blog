import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import isMobile from '../../utils/is-mobile';
import media from '../../utils/media';
import { GithubSvg } from '../svgs/github-svg';
import { HomeSvg } from '../svgs/home-svg';
import { UserSvg } from '../svgs/user-svg';

const Footer = styled.footer`
    margin-top: 20px;
    box-sizing: border-box;
    color: #8590a6;
    flex: 0 0 auto;
    font-size: 12px;
    font-weight: normal;
    position: relative;
    text-align: center;
    padding-top: 8px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
`;

const P = styled.p`
    word-break: break-all;
    word-wrap: break-word;
    line-height: 1.8;
    margin: 0;
    > a {
        text-decoration: none;
        color: #34495e;
    }
`;

const BackTopBtn = styled.div`
    color: #333;
    cursor: pointer;
    display: block;
    height: 44px;
    line-height: 44px;
    margin-bottom: -20px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    text-align: center;
    width: 44px;
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
    .tabbar-item{
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
    .tabbar-item__icon{
        position: relative;
        margin-bottom: 5px;
        font-size: 18px;
    }
`;

const HomeIcon = styled(HomeSvg)`
    fill:#2B414D;
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

const UserIcon = styled(UserSvg)`
    fill:#2B414D;
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

const GithubIcon = styled(GithubSvg)`
    fill:#2B414D;
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

export interface AppFooterProps {
    siteInfo: {
        icp: string,
        name: string,
        github: string
    };
}

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

export const AppFooter = (props: AppFooterProps) => {
    const { siteInfo } = props;
    useEffect(() => {
        loadBackTopBtnEvent();
        loadTimeCountEvent();
    });
    return (
        !isMobile
            ?
            <Footer>
                <BackTopBtn title="返回顶部" id="backTop">
                    <svg data-title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path>
                    </svg>
                </BackTopBtn>
                <P>
                    Powered by <strong>Nodejs</strong>
                </P>
                <P>
                    博客已开源至<a href="https://github.com/bs32g1038/node-blog" rel="noopener noreferrer" target="_blank" className="app-github">Github</a>请大家多多关注
            </P>
                <P>
                    <span>累计运行</span>
                    <span id="blog-runing-time"></span>
                </P>
                <P>
                    <span>
                        Copyright © 2016-2019</span>
                    <a className="text-white" href="/blog">
                        <strong> {siteInfo.name} </strong>
                    </a>
                    <span>
                        <a style={{ textDecoration: 'none', color: '#444' }} href="http://www.miitbeian.gov.cn/" rel="noopener noreferrer" target="_blank"> {siteInfo.icp} </a>
                    </span>
                </P>
            </Footer>
            :
            <MobileTabbar>
                <NavLink className="tabbar-item" to="/blog">
                    <div className="tabbar-item__icon">
                        <HomeIcon></HomeIcon>
                    </div>
                    <div className="tabbar-item__text">博客</div>
                </NavLink>
                <NavLink className="tabbar-item" to="/about">
                    <div className="tabbar-item__icon">
                        <UserIcon></UserIcon>
                    </div>
                    <div className="tabbar-item__text">关于</div>
                </NavLink>
                <a className="tabbar-item" href={siteInfo.github} rel="noopener noreferrer" target="_blank">
                    <div className="tabbar-item__icon">
                        <GithubIcon></GithubIcon>
                    </div>
                    <div className="tabbar-item__text">Gituhub</div>
                </a>
            </MobileTabbar>
    );
};