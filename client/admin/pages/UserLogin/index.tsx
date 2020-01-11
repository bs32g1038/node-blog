import React, { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import axios from '@blog/client/admin/axios';
import config from '@blog/client/admin/configs/default.config';
import { Input, Button, Alert, message, Form } from 'antd';
import { encrypt } from '@blog/client/admin/utils/crypto-js';
import { SignIn, SignInMain, SignInPanel, SignInHeader, SignInTitle } from './style';

const UserLogin = () => {
    const [firstLoginTip, setFirstLoginTip] = useState('');
    const handleLogin = data => {
        const str = encrypt(JSON.stringify(data));
        axios.post('/login', { key: str }).then(res => {
            message.success('登陆成功！');
            localStorage.setItem(config.tokenKey, res.data.token);
            Router.push('/admin/dashboard/analysis');
        });
    };
    useEffect(() => {
        axios.get('/getFirstLoginInfo').then(res => {
            setFirstLoginTip(res.data.msg);
        });
    }, [1]);
    return (
        <SignIn>
            <SignInMain>
                <div className="header">
                    <img className="brand" src={require('@blog/client/admin/assets/logo.svg')} alt="" />
                    <div className="header-title">
                        <h2>{config.title}</h2>
                        <p>轻量级 NODE BLOG 系统</p>
                    </div>
                </div>
                <SignInPanel>
                    <SignInHeader>
                        <SignInTitle className="sign-in-title">后台登陆</SignInTitle>
                    </SignInHeader>
                    {firstLoginTip && (
                        <Alert message={firstLoginTip} type="warning" style={{ margin: '0 20px 20px 20px' }} />
                    )}
                    <Form onFinish={handleLogin} className="login-form">
                        <Form.Item
                            name="account"
                            label="账号："
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="请输入账户" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码："
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input type="password" placeholder="请填写密码" />
                        </Form.Item>
                        <Form.Item label="操作：" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </SignInPanel>
                <div className="nodeblog">
                    Powered by
                    <a
                        href={config.siteInfo.domain}
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

export default withRouter(UserLogin);
