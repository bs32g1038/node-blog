import styled from '@emotion/styled';
import { padding } from 'polished';
import React, { Component } from 'react';

const Footer = styled.footer((props) => ({
    label: 'app-footer',
    marginTop: '20px',
    boxSizing: 'border-box',
    color: '#8590a6',
    flex: '0 0 auto',
    fontSize: '12px',
    fontWeight: 'normal',
    position: 'relative',
    textAlign: 'center',
    ...padding(8, 10, 10, 10)
}));

const P = styled.p((_) => ({
    wordBreak: 'break-all',
    wordWrap: 'break-word',
    lineHeight: 1.8,
    margin: 0,
    '> a': {
        textDecoration: 'none',
        color: '#34495e'
    }
}));

const BackTopBtn = styled.div((_) => ({
    color: '#333',
    cursor: 'pointer',
    display: 'block',
    height: '44px',
    lineHeight: '44px',
    marginBottom: '-20px',
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    textAlign: 'center',
    width: '44px'
}));

export interface AppFooterProps {
    siteInfo: {
        icp: string,
        name: string
    };
}

export default class AppFooter extends Component<AppFooterProps, {}> {
    /**
     * 返回顶部按钮逻辑实现
     */
    public loadBackTopBtnEvent() {
        let timer: any = null;
        const backTopEl = document.getElementById('backTop');
        if (backTopEl) {
            backTopEl.onclick = () => {
                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(function fn() {
                    const t = document.documentElement && document.documentElement.scrollTop;
                    const oTop = document.body.scrollTop || t || 0;
                    if (oTop > 0) {
                        const p = oTop - 50;
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
    }
    /**
     * 底部时间计数逻辑实现
     */
    public loadTimeCountEvent() {
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
    }
    public componentDidMount() {
        this.loadBackTopBtnEvent();
        this.loadTimeCountEvent();
    }
    public render() {
        const { siteInfo } = this.props;
        return (
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
        );
    }
}