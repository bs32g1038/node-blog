import React, { useState } from 'react';
import styles from './index.module.scss';
import Login from './components/Login';
import Register from './components/Register';
import { Modal } from 'antd';
import { useStore } from './zustand';
import { useFetchConfigQuery } from '@blog/client/web/api';

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
    const { data: config } = useFetchConfigQuery();
    const { isShowLoginModal, showLoginModal } = useStore();
    const [tab, setTab] = useState(LOGIN_TYPE.login);
    return isShowLoginModal ? (
        <Modal
            wrapClassName={styles.modal}
            title={config?.siteTitle}
            footer={null}
            width={330}
            centered
            open={isShowLoginModal}
            maskClosable={false}
            onCancel={() => {
                showLoginModal(false);
            }}
        >
            {tab === LOGIN_TYPE.login && <Login jumpRegister={() => setTab(LOGIN_TYPE.register)}></Login>}
            {tab === LOGIN_TYPE.register && <Register jumpLogin={() => setTab(LOGIN_TYPE.login)}></Register>}
        </Modal>
    ) : (
        <div></div>
    );
}
