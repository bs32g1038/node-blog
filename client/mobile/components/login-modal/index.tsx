import React, { useState } from 'react';
import styles from './index.module.scss';
import Login from './components/Login';
import Register from './components/Register';
import { useStore } from './zustand';
import { Popup } from 'antd-mobile';

export const LOGIN_TYPE = {
    login: 'login',
    register: 'register',
};

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    type: string;
    key: string;
}

export default function LoginModal() {
    const { isShowLoginModal, showLoginModal } = useStore();
    const [tab, setTab] = useState(LOGIN_TYPE.login);
    return isShowLoginModal ? (
        <Popup
            className={styles.modal}
            visible={isShowLoginModal}
            onClose={() => {
                showLoginModal(false);
            }}
            onMaskClick={() => {
                showLoginModal(false);
            }}
        >
            {tab === LOGIN_TYPE.login && <Login jumpRegister={() => setTab(LOGIN_TYPE.register)}></Login>}
            {tab === LOGIN_TYPE.register && <Register jumpLogin={() => setTab(LOGIN_TYPE.login)}></Register>}
        </Popup>
    ) : (
        <div></div>
    );
}
