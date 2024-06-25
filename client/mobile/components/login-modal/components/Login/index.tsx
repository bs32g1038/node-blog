import React from 'react';
import { Form, Input, Button, Space, Image, Toast } from 'antd-mobile';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from '../../index.module.scss';
import CaptchaSvg from '../CaptchaSvg';
import { useAuthLoginMutation } from '@blog/client/web/api';
import { encrypt } from '@blog/client/libs/crypto-js';

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

interface Props {
    jumpRegister: () => void;
}

export default function CLogin(props: Props) {
    const { jumpRegister } = props;
    const [form] = Form.useForm();
    const [login] = useAuthLoginMutation();
    const onFinish = (values: any) => {
        form.validateFields().then(() => {
            login({
                ...values,
                password: encrypt(values.password),
            })
                .unwrap()
                .then(() => {
                    window.location.reload();
                })
                .catch((err) => {
                    if (err?.data) {
                        Toast.show({
                            content: err.data.message,
                        });
                    }
                });
            return;
        });
    };
    return (
        <div className={styles.wrap}>
            <Form
                layout="horizontal"
                form={form}
                onFinish={onFinish}
                style={{
                    '--prefix-width': '90px',
                }}
            >
                <Form.Item
                    label={
                        <Space>
                            <UserOutlined className="site-form-item-icon" />
                            <span>账号</span>
                        </Space>
                    }
                    name="account"
                    rules={[{ required: true, message: '请输入账号!' }]}
                >
                    <Input placeholder="请输入账号" />
                </Form.Item>
                <Form.Item
                    label={
                        <Space>
                            <LockOutlined className="site-form-item-icon" />
                            <span>密码</span>
                        </Space>
                    }
                    name="password"
                    rules={[{ required: true, message: '请输入你的密码!' }]}
                    extra="忘记密码"
                >
                    <Input autoComplete="false" type="password" placeholder="请输入密码" />
                </Form.Item>
                <Form.Item
                    label={
                        <Space>
                            <CaptchaSvg />
                            <span>验证码</span>
                        </Space>
                    }
                    name="captcha"
                    rules={[{ required: true, message: '请输入验证码!' }]}
                    extra={
                        <Image
                            src="/api/files/captcha"
                            alt=""
                            style={{
                                height: 30,
                                width: 60,
                            }}
                            onClick={(e: any) => {
                                if (e.target?.nodeName?.toLocaleLowerCase() === 'img') {
                                    e.target?.setAttribute('src', '/api/files/captcha?' + new Date().getTime());
                                }
                            }}
                        ></Image>
                    }
                >
                    <Input
                        placeholder="请输入验证码"
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        size="large"
                        className={styles.loginButton}
                        onClick={() => {
                            form.submit();
                        }}
                    >
                        登录
                    </Button>
                </Form.Item>
                <Form.Item
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Button size="small" onClick={() => jumpRegister?.()}>
                        还没有账号，点击这里去注册{'>>'}
                    </Button>
                </Form.Item>
                <Form.Item>
                    <div className={styles.loginDescription}>
                        <Space className={styles.desc}>
                            <div className={styles.agreementBox}>
                                注册登录即表示同意
                                <a href="/terms" target="_blank">
                                    用户协议
                                </a>
                                、
                                <a href="/privacy" target="_blank">
                                    隐私政策
                                </a>
                            </div>
                        </Space>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}
