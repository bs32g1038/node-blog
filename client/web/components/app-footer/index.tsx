import React from 'react';
import style from './style.module.scss';
import BackTopBtn from '../back-top-button';
import BlogRuningTime from '../blog-runing-time';
import { EmailIcon, WechatIcon, QQIcon, GithubIcon } from '../../icons';
import icpPng from '@blog/client/assets/images/icp.png';
import { useFetchConfigQuery } from '../../api';
import { Space } from 'antd';
import LogoSvg from '../logo-svg';
import vultrPng from '@blog/client/assets/banners/vultr_banner_728x90.png';
import Image from 'next/image';

export const AppFooter = () => {
    const { data: config } = useFetchConfigQuery();
    return (
        <footer className={style.appFooter} id="app-footer">
            <BackTopBtn></BackTopBtn>
            <div className={style.info}>
                <section className={style.content}>
                    <div className={style.siteInfo}>
                        <div className={style.svgWrap}>
                            <LogoSvg></LogoSvg>
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
                        <Space
                            style={{
                                fontSize: 12,
                            }}
                        >
                            <span>运行时间：</span>
                            <BlogRuningTime></BlogRuningTime>
                        </Space>
                        <div>
                            版权 © 2016-{new Date().getFullYear()} {config.siteTitle}
                            <a href={config.icpGovCn}>
                                <img src={icpPng.src} alt={icpPng.src} />
                                <span>{config.siteIcp}</span>
                            </a>
                        </div>
                    </div>
                </section>
                <section className={style.support}>
                    <h3>商务合作</h3>
                    <p>承包前后端业务，联系前，请明确你的需求，最低报价，工期。</p>
                    <div className={style.supportList}>
                        <a href="https://nestjs.com">
                            <img src={require('@blog/client/assets/svgs/logo-nestjs.svg')} alt="" />
                        </a>
                        <a href="https://react.docschina.org">
                            <img src={require('@blog/client/assets/svgs/logo-react.svg')} alt="" />
                        </a>
                        <a href="https://nodejs.org/en">
                            <img src={require('@blog/client/assets/svgs/logo-nodejs.svg')} alt="" />
                        </a>
                        <a href="https://ant.design">
                            <img src={require('@blog/client/assets/svgs/logo-ant-design.svg')} alt="" />
                        </a>
                    </div>
                </section>
            </div>
            <div className={style.invite}>
                <h3 className={style.inviteTitle}>
                    当前博客由vultr提供云服务器支持，点击下方链接购买服务器有优惠，博主也会从中受益，谢谢支持。
                </h3>
                <a
                    href="https://www.vultr.com/?ref=7007600"
                    style={{ position: 'relative', display: 'block', height: 90, margin: '0 auto' }}
                >
                    <Image src={vultrPng.src} fill={true} quality={100} alt="" />
                </a>
            </div>
        </footer>
    );
};
