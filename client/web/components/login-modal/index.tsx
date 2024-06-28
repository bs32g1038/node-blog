import React from 'react';
import styles from './index.module.scss';
import Login from './components/Login';
import Register from './components/Register';
import { Modal } from 'antd';
import { LOGIN_TYPE, useStore } from './zustand';
import { useFetchConfigQuery } from '../../api';

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    type: string;
    key: string;
}

export default function LoginModal() {
    const { data: config } = useFetchConfigQuery();
    const { tab, isShowLoginModal, showLoginModal } = useStore();
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
            {tab === LOGIN_TYPE.login && <Login></Login>}
            {tab === LOGIN_TYPE.register && <Register></Register>}
        </Modal>
    ) : (
        <div></div>
    );
}
