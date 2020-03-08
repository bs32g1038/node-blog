import React from 'react';
import Router from 'next/router';
import axios from '@blog/client/admin/axios';
import config from '@blog/client/configs/admin.default.config';
import { Input, Button, Alert, message, Form } from 'antd';
import { encrypt } from '@blog/client/admin/utils/crypto.util';
import { SignIn, SignInMain, SignInPanel, SignInHeader, SignInTitle } from './style';
import useRequest from '@blog/client/admin/hooks/useRequest';
import useRequestLoading from '@blog/client/admin/hooks/useRequestLoading';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import { UserOutlined, LockOutlined, AliwangwangOutlined } from '@ant-design/icons';

export default () => {
    const { data } = useRequest<{ message: string }>({ url: '/getFirstLoginInfo' });
    const appConfig = useSelector((state: RootState) => state.app.config);
    const { loading, setLoading, injectRequestLoading } = useRequestLoading();
    const handleLogin = data => {
        const str = encrypt(JSON.stringify(data));
        injectRequestLoading(axios.post('/login', { key: str }))
            .then(res => {
                message.success('登陆成功！');
                localStorage.setItem(config.userInfoKey, JSON.stringify(res.data));
                localStorage.setItem(config.tokenKey, res.data.token);
                Router.push('/admin/dashboard');
            })
            .catch(() => {
                setLoading(false);
            });
    };
    return (
        <SignIn>
            <SignInMain>
                <div className="header">
                    <img className="brand" src={appConfig.siteLogo} alt="" />
                    <div className="header-title">
                        <h2>{appConfig.siteTitle}</h2>
                        <p>轻量级 NODE BLOG 系统</p>
                    </div>
                </div>
                <SignInPanel>
                    <SignInHeader>
                        <SignInTitle className="sign-in-title">后台登陆</SignInTitle>
                    </SignInHeader>
                    {data && <Alert message={data.message} type="warning" style={{ margin: '0 20px 20px 20px' }} />}
                    <Form onFinish={handleLogin} className="login-form">
                        {data && (
                            <Form.Item
                                name="userName"
                                label="用户名："
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                rules={[{ required: true, message: 'Please input your userName!' }]}
                            >
                                <Input prefix={<AliwangwangOutlined />} placeholder="请输入用户名" />
                            </Form.Item>
                        )}
                        <Form.Item
                            name="account"
                            label="账号："
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            rules={[{ required: true, message: 'Please input your account!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="请输入账户" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码："
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input prefix={<LockOutlined />} type="password" placeholder="请填写密码" />
                        </Form.Item>
                        <Form.Item label="操作：" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </SignInPanel>
                <div className="nodeblog">
                    Powered by
                    <a
                        href={appConfig.siteDomain}
                        title="轻量级nodeblog博客系统"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        LIZCBLOG
                    </a>
                </div>
            </SignInMain>
        </SignIn>
    );
};
