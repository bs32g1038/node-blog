import React, { useEffect } from 'react';
import style from './style.module.scss';

const Skeleton = (props) => {
    // useEffect(() => {
    //   document.querySelector("loader").innerHTML
    // }, [1]);
    return <div {...props} className={style.skeleton}></div>;
};

export default Skeleton;
