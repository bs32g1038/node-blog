import { gernateAvatarImage } from '@blog/client/common/helper.util';
import React from 'react';
import style from './style.module.scss';
import Image from 'next/image';

export default function avatar({ nickName }) {
    return (
        <div className={style.userInfoAvatar}>
            <Image width={'72px'} height={'72px'} title={nickName} src={gernateAvatarImage(nickName) || ''} alt="" />
        </div>
    );
}
