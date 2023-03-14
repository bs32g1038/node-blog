import React from 'react';
import Router from 'next/router';
import { Input, Button, Alert, message, Form, Image } from 'antd';
import { encrypt } from '@blog/client/admin/utils/crypto.util';
import { UserOutlined, LockOutlined, AliwangwangOutlined } from '@ant-design/icons';
import style from './style.module.scss';
import { useFetchConfigQuery } from '@blog/client/web/api';
import { useFetchFirstMessageQuery, useLoginMutation } from './service';
import defaultConfig from '@blog/client/configs/admin.default.config';
import { wrapper } from '@blog/client/redux/store';

export default function UserLogin(props) {
    wrapper.useHydration(props);
    const { data = { message: '' } } = useFetchFirstMessageQuery();
    const { data: appConfig } = useFetchConfigQuery();
    const [login, { isLoading }] = useLoginMutation();
    const handleLogin = async (_data) => {
        const str = encrypt(JSON.stringify(_data));
        await login({ key: str })
            .unwrap()
            .then((res) => {
                localStorage.setItem(defaultConfig.tokenKey, res.token);
                message.success('登陆成功！');
                Router.push('/admin/content/articles');
            });
    };
    return (
        <div className={style.signIn}>
            <div className={style.signInMain}>
                <div className="header">
                    <Image width={60} preview={false} className="brand" src={appConfig.siteLogo} alt="" />
                    <div className="header-title">
                        <h2>{appConfig.siteTitle}</h2>
                        <p>轻量级 NODE BLOG 系统</p>
                    </div>
                </div>
                <div className={style.signInPanel}>
                    <div className={style.signInHeader}>
                        <h3 className={style.signInTitle}>后台登陆</h3>
                    </div>
                    {data?.message && (
                        <Alert message={data.message} type="warning" style={{ margin: '0 20px 20px 20px' }} />
                    )}
                    <Form onFinish={handleLogin} className="login-form">
                        {data?.message && (
                            <Form.Item
                                name="userName"
                                label="用户名："
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                rules={[{ required: true, message: '请输入你的用户名!' }]}
                            >
                                <Input prefix={<AliwangwangOutlined />} placeholder="请输入" />
                            </Form.Item>
                        )}
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
                        href={appConfig.siteDomain}
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
