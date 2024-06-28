import React, { useState } from 'react';
import { Form, Input, Button, message, Space, Image } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import styles from '../../index.module.scss';
import CaptchaSvg from '../CaptchaSvg';
import { useRegisterMutation, useRegisterSendEmailMutation } from '@blog/client/web/api';
import { encrypt } from '@blog/client/libs/crypto-js';
import { useStore, LOGIN_TYPE } from '../../zustand';

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    type: string;
    key: string;
}

export default function CLogin() {
    const { setTab } = useStore();
    const [form] = useForm();
    const [step, setStep] = useState(1);
    const [register] = useRegisterMutation();
    const [registerSendEmail] = useRegisterSendEmailMutation();
    const onFinish = (values: any) => {
        form.validateFields().then(() => {
            register({
                ...values,
                password: encrypt(values.password),
            })
                .unwrap()
                .then(() => {
                    message.success('注册成功！');
                    setTab(LOGIN_TYPE.login);
                })
                .catch((err) => {
                    if (err?.data) {
                        message.error(err.data.message);
                    }
                });
        });
    };
    return (
        <div className={styles.wrap}>
            <div>
                <strong>用户注册</strong>
            </div>
            <Form form={form} initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
                <div
                    style={{
                        display: step === 1 ? 'block' : 'none',
                    }}
                >
                    <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
                        <Input
                            autoComplete="off"
                            prefix={
                                <Space size={3}>
                                    <MailOutlined />
                                    <span>邮箱</span>
                                </Space>
                            }
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
                        <Button
                            type="primary"
                            className={styles.loginButton}
                            onClick={() => {
                                form.validateFields().then((values) => {
                                    registerSendEmail(values)
                                        .unwrap()
                                        .then(() => {
                                            setStep(2);
                                        });
                                });
                            }}
                        >
                            下一步
                        </Button>
                    </Form.Item>
                </div>
                {step === 2 && (
                    <div>
                        <Space direction="vertical">
                            <div>已发送验证码到邮你的邮箱，注意查收</div>
                            <Form.Item name="emailCode" rules={[{ required: true, message: '请输入邮箱验证码' }]}>
                                <Input.OTP length={6} />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                                <Input.Password
                                    autoComplete="off"
                                    prefix={
                                        <Space size={3}>
                                            <LockOutlined />
                                            <span>密码</span>
                                        </Space>
                                    }
                                    placeholder="请输入"
                                />
                            </Form.Item>
                        </Space>
                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" className={styles.loginButton}>
                                注册
                            </Button>
                        </Form.Item>
                    </div>
                )}
                <Form.Item
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Button size="small" type="text" onClick={() => setTab(LOGIN_TYPE.login)}>
                        已有账号，点击这里去登录{'>>'}
                    </Button>
                </Form.Item>
                <Form.Item>
                    <div className={styles.loginDescription}>
                        <div>
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
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}
