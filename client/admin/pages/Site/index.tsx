import React from 'react';
import BasicLayout from '@blog/client/admin/layouts';
import style from './style.module.scss';

export default function Site() {
    return (
        <BasicLayout>
            <div className={style.wrap}>
                <iframe className={style.Iframe} src="/"></iframe>
            </div>
        </BasicLayout>
    );
}
