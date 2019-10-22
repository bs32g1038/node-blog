import React, { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import axios from '@blog/client/admin/axios';
import config from '@blog/client/admin/configs/default.config';
import { Form, Input, Button, Alert, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { encrypt } from '@blog/client/admin/utils/crypto-js';
import { SignIn, SignInMain, SignInPanel, SignInHeader, SignInTitle } from './style';

const FormItem = Form.Item;

const UserLogin = (props: FormComponentProps) => {
    const { getFieldDecorator } = props.form;
    const [firstLoginTip, setFirstLoginTip] = useState('');
    const handleLogin = e => {
        e.preventDefault();
        props.form.validateFields((err, data) => {
            const str = encrypt(JSON.stringify(data));
            if (!err) {
                axios.post('/login', { key: str }).then(res => {
                    message.success('登陆成功！');
                    localStorage.setItem(config.tokenKey, res.data.token);
                    Router.push('/admin/dashboard/analysis');
                });
            }
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
                    <Form onSubmit={e => handleLogin(e)} className="login-form">
                        <FormItem label="账号：" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            {getFieldDecorator('account', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(<Input placeholder="请输入账户" />)}
                        </FormItem>
                        <FormItem label="密码：" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(<Input type="password" placeholder="请填写密码" />)}
                        </FormItem>
                        <FormItem label="操作：" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </FormItem>
                    </Form>
                </SignInPanel>
                <div className="nodeblog">
                    Powered by
                    <a
                        href={config.siteInfo.webDomain}
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

export default withRouter(Form.create<FormComponentProps>()(UserLogin) as any);
