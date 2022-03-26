/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import style from './style.module.scss';
import BackTopBtn from '../back-top-button';
import BlogRuningTime from '../blog-runing-time';
import { ReactSVG } from 'react-svg';
import { EmailIcon, WechatIcon, QQIcon, GithubIcon } from '../../icons';
import icpPng from '@blog/client/assets/images/icp.png';
import { useFetchConfigQuery } from '../../api';

export const AppFooter = () => {
    const { data: config } = useFetchConfigQuery();
    return (
        <footer className={style.appFooter} id="app-footer">
            <BackTopBtn></BackTopBtn>
            <section className={style.content}>
                <div className={style.siteInfo}>
                    <div className={style.svgWrap}>
                        <ReactSVG src={config.siteLogo} />
                        <p className={style.siteTitle}>欢迎来到 {config.siteTitle} 😀</p>
                    </div>
                    <p className={style.siteTitle}>这里主要分享前后端技术文章，致力于web技术研究。</p>
                </div>
                <div className={style.contact}>
                    <div className={style.contactTitle}>Contact us: </div>
                    <div className={style.contactList}>
                        <a href="mailto:bs32g1038@163.com">
                            <EmailIcon></EmailIcon>
                        </a>
                        <a>
                            <WechatIcon></WechatIcon>
                        </a>
                        <a>
                            <QQIcon></QQIcon>
                        </a>
                        <a href={config.projectGithub}>
                            <GithubIcon></GithubIcon>
                        </a>
                    </div>
                </div>
                <div className={style.statement}>
                    <BlogRuningTime></BlogRuningTime>&nbsp;&nbsp;版权 © 2016-{new Date().getFullYear()}{' '}
                    {config.siteTitle}
                    <a href={config.icpGovCn}>
                        <img src={icpPng.src} alt={icpPng.src} />
                        <span>{config.siteIcp}</span>
                    </a>
                </div>
            </section>
            <section className={style.support}>
                <h3>商务合作</h3>
                <p>承包前后端业务，联系前，请明确你的需求，最低报价，工期。</p>
                <div className={style.supportList}>
                    <a href="https://nestjs.com">
                        <img src={require('@blog/client/assets/svgs/logo-nestjs.svg')} />
                    </a>
                    <a href="https://react.docschina.org">
                        <img src={require('@blog/client/assets/svgs/logo-react.svg')} />
                    </a>
                    <a href="https://nodejs.org/en">
                        <img src={require('@blog/client/assets/svgs/logo-nodejs.svg')} />
                    </a>
                    <a href="https://ant.design">
                        <img src={require('@blog/client/assets/svgs/logo-ant-design.svg')} />
                    </a>
                </div>
            </section>
        </footer>
    );
};
