import React from 'react';
import style from './style.module.scss';
import vultrPng from '@blog/client/assets/banners/vultr_banner_728x90.png';
import Image from 'next/image';

const AboutPage = () => {
    return (
        <div className={style.about}>
            <div className={style.invite}>
                <h3 className={style.inviteTitle}>
                    当前博客由vultr提供云服务器支持，点击下方链接购买服务器有优惠，博主也会从中受益，谢谢支持。
                </h3>
                <a
                    href="https://www.vultr.com/?ref=7007600"
                    style={{ position: 'relative', display: 'block', height: 90, margin: '0 auto 20px' }}
                >
                    <Image src={vultrPng.src} fill={true} quality={100} alt="" />
                </a>
            </div>
        </div>
    );
};

export { AboutPage };
