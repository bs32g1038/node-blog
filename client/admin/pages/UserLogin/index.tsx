import React from 'react';
import Router from 'next/router';
import { Input, Button, message, Form, Image, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './style.module.scss';
import { useFetchConfigQuery } from '@blog/client/web/api';
import { useLoginMutation } from './service';
import { wrapper } from '@blog/client/redux/store';
import CaptchaSvg from '@blog/client/mobile/components/login-modal/components/CaptchaSvg';
import { encrypt } from '@blog/client/libs/crypto-js';

export default function UserLogin(props: any) {
    wrapper.useHydration(props);
    const { data: appConfig } = useFetchConfigQuery();
    const [login, { isLoading }] = useLoginMutation();
    const handleLogin = async (_data: any) => {
        await login({
            account: _data.account,
            password: encrypt(_data.password),
            isAdmin: true,
            captcha: _data.captcha,
        })
            .unwrap()
            .then(() => {
                message.success('登陆成功！');
                Router.push('/admin/content/articles');
            });
    };
    return (
        <div className={style.signIn}>
            <div className={style.signInMain}>
                <div className={style.signInPanel}>
                    <div className={style.signInHeader}>
                        <Image width={24} preview={false} className="brand" src={appConfig?.siteLogo} alt="" />
                        <h3 className={style.signInTitle} style={{ marginLeft: 5 }}>
                            {appConfig?.siteTitle}登录
                        </h3>
                    </div>
                    <Form onFinish={handleLogin} className="login-form">
                        <Form.Item
                            name="account"
                            label="账号："
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            rules={[{ required: true, message: '请输入你的邮箱!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="请输入" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码："
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            rules={[{ required: true, message: '请输入你的密码!' }]}
                        >
                            <Input prefix={<LockOutlined />} type="password" placeholder="请填写" />
                        </Form.Item>
                        <Form.Item
                            label="验证码："
                            name="captcha"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            rules={[{ required: true, message: '请输入验证码!' }]}
                        >
                            <Space style={{ display: 'flex' }}>
                                <Input
                                    prefix={<CaptchaSvg />}
                                    placeholder="请输入验证码"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                                <Image
                                    src={'/api/files/captcha?' + new Date().getTime()}
                                    alt=""
                                    style={{
                                        height: 32,
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
                        <Form.Item label="操作：" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="nodeblog">
                    Powered by
                    <a
                        href="https://github.com/bs32g1038/node-blog"
                        title="轻量级nodeblog博客系统"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        NODEBLOG
                    </a>
                </div>
            </div>
        </div>
    );
}
