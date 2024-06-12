import React from 'react';
import Router from 'next/router';
import { Input, Button, message, Form, Image } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './style.module.scss';
import { useFetchConfigQuery } from '@blog/client/web/api';
import { useLoginMutation } from './service';
import { wrapper } from '@blog/client/redux/store';

export default function UserLogin(props: any) {
    wrapper.useHydration(props);
    const { data: appConfig } = useFetchConfigQuery();
    const [login, { isLoading }] = useLoginMutation();
    const handleLogin = async (_data: any) => {
        await login({ account: _data.account, password: _data.password, isAdmin: true })
            .unwrap()
            .then(() => {
                message.success('登陆成功！');
                Router.push('/admin/content/articles');
            });
    };
    return (
        <div className={style.signIn}>
            <div className={style.signInMain}>
                <div className="header">
                    <Image width={60} preview={false} className="brand" src={appConfig?.siteLogo} alt="" />
                    <div className="header-title">
                        <h2>{appConfig?.siteTitle}</h2>
                        <p>轻量级 NODE BLOG 系统</p>
                    </div>
                </div>
                <div className={style.signInPanel}>
                    <div className={style.signInHeader}>
                        <h3 className={style.signInTitle}>后台登陆</h3>
                    </div>
                    <Form onFinish={handleLogin} className="login-form">
                        <Form.Item
                            name="account"
                            label="账号："
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            rules={[{ required: true, message: '请输入你的账号!' }]}
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
                        href={appConfig?.siteDomain}
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
