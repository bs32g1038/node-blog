import React from 'react';
import BasicLayout from '@blog/client/admin/layouts';
import InfoForm from './InfoForm';
import PasswordForm from './PasswordForm';
import style from './style.module.scss';

export default () => {
    return (
        <BasicLayout>
            <div className={style.wrap}>
                <InfoForm></InfoForm>
                <PasswordForm></PasswordForm>
            </div>
        </BasicLayout>
    );
};
