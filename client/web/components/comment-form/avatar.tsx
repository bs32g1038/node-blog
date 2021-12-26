import { gernateAvatarImage } from '@blog/client/common/helper.util';
import React from 'react';
import style from './style.module.scss';

export default ({ nickName }) => {
    return <img className={style.userInfoAvatar} title={nickName} src={gernateAvatarImage(nickName) || ''} />;
};
