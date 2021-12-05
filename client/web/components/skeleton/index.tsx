import React from 'react';
import style from './style.module.scss';

const Skeleton = (props) => {
    return <div {...props} className={style.skeleton}></div>;
};

export default Skeleton;
