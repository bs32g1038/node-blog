import React from 'react';
import { Form, Input, Button, message, Space, Image } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import styles from '../../index.module.scss';
import CaptchaSvg from '../CaptchaSvg';
import { omit } from 'lodash';
import { useRegisterMutation } from '@blog/client/web/api';

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
    const [form] = useForm();
    const [register] = useRegisterMutation();
    const onFinish = (values: any) => {
        form.validateFields().then(() => {
            if (values.repeatPassword !== values.password) {
                return message.error('两次输入的密码不一致！');
            }
            register(omit(values, 'repeatPassword') as any)
                .unwrap()
                .then(() => {
                    message.success('注册成功！');
                    jumpLogin?.();
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
            <Form form={form} name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item name="account" rules={[{ required: true, message: '请输入账号' }]}>
                    <Input
                        prefix={
                            <Space size={3}>
                                <UserOutlined className="site-form-item-icon" />
                                <span>账号</span>
                            </Space>
                        }
                        placeholder="请输入账号"
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
                            placeholder="请输入验证码"
                            style={{
                                width: '100%',
                            }}
                        />
                        <Image
                            src="/api/files/captcha"
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
                <Form.Item name="password" rules={[{ required: true, message: '请输入你的密码' }]}>
                    <Input
                        autoComplete="new-password"
                        prefix={
                            <Space size={3}>
                                <LockOutlined className="site-form-item-icon" />
                                <span>密码</span>
                            </Space>
                        }
                        type="password"
                        placeholder="请输入密码"
                    />
                </Form.Item>
                <Form.Item name="repeatPassword" rules={[{ required: true, message: '请再次输入你的密码' }]}>
                    <Input
                        prefix={
                            <Space size={3}>
                                <LockOutlined className="site-form-item-icon" />
                                <span>确认密码</span>
                            </Space>
                        }
                        type="password"
                        placeholder="请再次输入你的密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" className={styles.loginButton}>
                        注册
                    </Button>
                </Form.Item>
                <Form.Item
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Button size="small" type="text" onClick={() => jumpLogin?.()}>
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
