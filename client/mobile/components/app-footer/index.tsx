import React from 'react';
import style from './style.module.scss';
import { EmailIcon, WechatIcon, QQIcon, GithubIcon } from '@blog/client/web/icons';
import { useFetchConfigQuery } from '@blog/client/web/api';
import LogoSvg from '../logo-svg';
import bannerjpg from '@blog/client/assets/banners/1040X100.jpg';
import BlogRuningTime from '../blog-runing-time';
import { Space } from 'antd-mobile';

export const AppFooter = () => {
    const { data: config } = useFetchConfigQuery();
    return (
        <footer className={style.appFooter} id="app-footer">
            <div className={style.appFooterMain}>
                <div className={style.info}>
                    <section className={style.content}>
                        <div className={style.siteInfo}>
                            <div className={style.svgWrap}>
                                <LogoSvg></LogoSvg>
                                <p style={{ margin: 0 }}>
                                    欢迎来到
                                    <span className={style.siteTitle}>{config?.siteTitle} </span>
                                    😀
                                </p>
                            </div>
                        </div>
                        <p style={{ margin: 0 }}>这里主要分享前后端技术文章，致力于web技术研究。</p>
                        <Space>
                            <span>版权 © 2016-{new Date().getFullYear()}</span>
                            <span>
                                运行：<BlogRuningTime></BlogRuningTime>
                            </span>
                        </Space>
                        <div className={style.contactList}>
                            <a href={config?.icpGovCn} className={style.icpGovCn}>
                                <span className={style.siteIcp}>{config?.siteIcp}</span>
                            </a>
                            <a href="mailto:bs32g1038@163.com">
                                <EmailIcon></EmailIcon>
                            </a>
                            <a>
                                <WechatIcon></WechatIcon>
                            </a>
                            <a>
                                <QQIcon></QQIcon>
                            </a>
                            <a href={config?.projectGithub}>
                                <GithubIcon></GithubIcon>
                            </a>
                        </div>
                    </section>
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
                </div>
                <div className={style.invite}>
                    <h3 className={style.inviteTitle}>
                        博客由腾讯云提供云服务器支持，点击下方链接购买服务器有优惠，博主也会从中受益，谢谢支持。
                    </h3>
                    <a
                        href="https://curl.qcloud.com/Fmz3Mj1W"
                        style={{ position: 'relative', display: 'block', margin: '0 auto' }}
                    >
                        <img src={bannerjpg.src} style={{ width: '100%' }} alt="" />
                    </a>
                </div>
            </div>
        </footer>
    );
};
