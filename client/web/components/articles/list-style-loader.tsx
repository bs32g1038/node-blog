import React from 'react';
import Skeleton from '../skeleton';
import style from './list-style-loader.style.module.scss';

const ListStyleLoader = () => {
    return (
        <div className={style.list}>
            <div className={style.listLeft}></div>
            <div className={style.listRight}>
                <Skeleton style={{ width: '200px', height: '100px' }}></Skeleton>
                <Skeleton style={{ width: '200px', height: '100px' }}></Skeleton>
            </div>
        </div>
    );
};

export default ListStyleLoader;
