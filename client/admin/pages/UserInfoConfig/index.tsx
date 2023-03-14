import React from 'react';
import BasicLayout from '@blog/client/admin/layouts';
import InfoForm from './InfoForm';
import PasswordForm from './PasswordForm';
import style from './style.module.scss';
import { wrapper } from '@blog/client/redux/store';

export default function UserInfoConfig(props) {
    wrapper.useHydration(props);
    return (
        <BasicLayout>
            <div className={style.wrap}>
                <InfoForm></InfoForm>
                <PasswordForm></PasswordForm>
            </div>
        </BasicLayout>
    );
}
