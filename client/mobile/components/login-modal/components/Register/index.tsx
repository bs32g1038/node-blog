import React, { useState } from 'react';
import { Form, Input, Button, Space, Image, Toast, NumberKeyboard, PasscodeInput } from 'antd-mobile';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from '../../index.module.scss';
import CaptchaSvg from '../CaptchaSvg';
import { omit } from 'lodash';
import { useRegisterMutation, useRegisterSendEmailMutation } from '@blog/client/web/api';
import { encrypt } from '@blog/client/libs/crypto-js';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    type: string;
    key: string;
}

interface Props {
    jumpLogin: () => void;
}

export default function CLogin(props: Props) {
    const { jumpLogin } = props;
    const [form] = Form.useForm();
    const [step, setStep] = useState(1);
    const [register] = useRegisterMutation();
    const [visible, setVisible] = useState(false);
    const [registerSendEmail] = useRegisterSendEmailMutation();
    const onFinish = (values: any) => {
        form.validateFields().then(() => {
            if (values.repeatPassword !== values.password) {
                Toast.show({
                    content: '两次输入的密码不一致！',
                });
                return;
            }
            register({
                ...(omit(values, 'repeatPassword') as any),
                password: encrypt(values.password),
            })
                .unwrap()
                .then(() => {
                    Toast.show({
                        content: '注册成功！',
                    });
                    jumpLogin?.();
                })
                .catch((err) => {
                    if (err?.data) {
                        Toast.show({
                            content: err.data.message,
                        });
                    }
                });
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
                <div
                    style={{
                        display: step === 1 ? 'block' : 'none',
                    }}
                >
                    <Form.Item
                        label={
                            <Space>
                                <MailOutlined />
                                <span>邮箱</span>
                            </Space>
                        }
                        name="email"
                        rules={[{ required: true, message: '请输入邮箱' }]}
                    >
                        <Input autoComplete="off" placeholder="请输入" />
                    </Form.Item>
                    <Form.Item
                        name="captcha"
                        rules={[{ required: true, message: '请输入验证码' }]}
                        label={
                            <Space>
                                <CaptchaSvg />
                                <span>验证码</span>
                            </Space>
                        }
                        extra={
                            <Image
                                src={'/api/files/captcha?' + new Date().getTime()}
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
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item>
                        <Button
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
                                <PasscodeInput seperated keyboard={<NumberKeyboard />} />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <Space>
                                        <LockOutlined />
                                        <span>密码</span>
                                    </Space>
                                }
                                name="password"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input
                                    className={styles.input}
                                    placeholder="请输入密码"
                                    type={visible ? 'text' : 'password'}
                                />
                            </Form.Item>
                        </Space>
                        <Form.Item>
                            <Button
                                size="large"
                                className={styles.loginButton}
                                onClick={() => {
                                    form.submit();
                                }}
                            >
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
                    <Button size="small" onClick={() => jumpLogin?.()}>
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
