import React from 'react';
import { Form, Input, Button, message, Space, Image } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import styles from '../../index.module.scss';
import CaptchaSvg from '../CaptchaSvg';
import { useAuthLoginMutation } from '@blog/client/web/api';
import { encrypt } from '@blog/client/libs/crypto-js';
import { LOGIN_TYPE, useStore } from '../../zustand';

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    type: string;
    key: string;
}

export default function CLogin() {
    const [form] = useForm();
    const { setTab } = useStore();
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
                        message.error(err.data.message);
                    }
                });
            return;
        });
    };
    return (
        <div className={styles.wrap}>
            <div>
                <strong>用户登录</strong>
            </div>
            <Form form={form} initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
                    <Input
                        prefix={
                            <Space size={3}>
                                <MailOutlined />
                                <span>邮箱</span>
                            </Space>
                        }
                        placeholder="请输入"
                    />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入登录密码' }]}>
                    <Input
                        autoComplete="false"
                        prefix={
                            <Space size={3}>
                                <LockOutlined />
                                <span>密码</span>
                            </Space>
                        }
                        type="password"
                        placeholder="请输入"
                    />
                </Form.Item>
                <Form.Item name="captcha" rules={[{ required: true, message: '请输入验证码' }]}>
                    <Space style={{ display: 'flex' }}>
                        <Input
                            prefix={
                                <Space size={3}>
                                    <CaptchaSvg />
                                    <span>验证码</span>
                                </Space>
                            }
                            placeholder="请输入"
                            style={{
                                width: '100%',
                            }}
                        />
                        <Image
                            src={'/api/files/captcha?' + new Date().getTime()}
                            alt=""
                            style={{
                                height: 40,
                            }}
                            preview={false}
                            onClick={(e: any) => {
                                if (e.target?.nodeName?.toLocaleLowerCase() === 'img') {
                                    e.target?.setAttribute('src', '/api/files/captcha?' + new Date().getTime());
                                }
                            }}
                        ></Image>
                    </Space>
                </Form.Item>
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" className={styles.loginButton}>
                        登录
                    </Button>
                </Form.Item>
                <Form.Item
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Button
                        size="small"
                        type="text"
                        onClick={() => {
                            setTab(LOGIN_TYPE.register);
                        }}
                    >
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
