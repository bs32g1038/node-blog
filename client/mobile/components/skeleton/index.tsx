import React from 'react';
import style from './style.module.scss';

const Skeleton = (props: any) => {
    return <div {...props} className={style.skeleton}></div>;
};

export default Skeleton;
