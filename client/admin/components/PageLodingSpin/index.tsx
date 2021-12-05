import React from 'react';
import { Spin } from 'antd';
import style from './style.module.scss';

export default () => {
    return (
        <div className={style.wrap}>
            <Spin size="large" />
        </div>
    );
};
