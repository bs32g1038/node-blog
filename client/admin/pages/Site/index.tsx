import React from 'react';
import BasicLayout from '@blog/client/admin/layouts';
import style from './style.module.scss';


export default () => {
    return (
        <BasicLayout>
            <div className={style.wrap}>
                <iframe className={style.Iframe} src="/" frameBorder="0" allowTransparency={true}></iframe>
            </div>
        </BasicLayout>
    );
};
