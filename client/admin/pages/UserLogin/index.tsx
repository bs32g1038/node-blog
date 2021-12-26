import React from 'react';
import Router from 'next/router';
import axios from '@blog/client/admin/axios';
import { Input, Button, Alert, message, Form } from 'antd';
import { encrypt } from '@blog/client/admin/utils/crypto.util';
import useRequest from '@blog/client/admin/hooks/useRequest';
import useRequestLoading from '@blog/client/admin/hooks/useRequestLoading';
import { UserOutlined, LockOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';
import style from './style.module.scss';
import { useFetchConfigQuery } from '@blog/client/web/api';
import defaultConfig from '@blog/client/configs/admin.default.config';

export default () => {
    const [data] = useRequest('/getFirstLoginInfo', { page: 1, limit: 100 });
    const { data: appConfig } = useFetchConfigQuery();
    const { loading, setLoading, injectRequestLoading } = useRequestLoading();
    const handleLogin = (data) => {
        const str = encrypt(JSON.stringify(data));
        injectRequestLoading(axios.post('/login', { key: str }))
            .then((res) => {
                message.success('登陆成功！');
                localStorage.setItem(defaultConfig.userInfoKey, JSON.stringify(res.data));
                localStorage.setItem(defaultConfig.tokenKey, res.data.token);
                Router.push('/admin/dashboard');
            })
            .catch(() => {
                setLoading(false);
            });
    };
    return (
        <div className={style.signIn}>
            <div className={style.signInMain}>
                <div className="header">
                    <ReactSVG className="brand" src={appConfig.siteLogo} />
                    <div className="header-title">
                        <h2>{appConfig.siteTitle}</h2>
                        <p>轻量级 NODE BLOG 系统</p>
                    </div>
                </div>
                <div className={style.signInPanel}>
                    <div className={style.signInHeader}>
                        <h3 className={style.signInTitle}>后台登陆</h3>
                    </div>
                    {data && <Alert message={data.message} type="warning" style={{ margin: '0 20px 20px 20px' }} />}
                    <Form onFinish={handleLogin} className="login-form">
                        {data && (
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
                            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
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
                        LIZCBLOG
                    </a>
                </div>
            </div>
        </div>
    );
};
