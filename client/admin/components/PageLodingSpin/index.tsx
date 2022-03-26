import React from 'react';
import { Spin } from 'antd';
import style from './style.module.scss';

export default function PageLodingSpin() {
    return (
        <div className={style.wrap}>
            <Spin size="large" />
        </div>
    );
}
