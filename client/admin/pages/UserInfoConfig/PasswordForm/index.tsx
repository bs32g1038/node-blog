import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from '@blog/client/admin/axios';
import { encrypt } from '@blog/client/admin/utils/crypto.util';

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const resetPassword = data => {
    return axios.put('/user/reset-password', data);
};

export default () => {
    return (
        <Form
            layout="vertical"
            name="passwrodForm"
            scrollToFirstError
            style={{ maxWidth: '540px', margin: '0 auto', width: '100%' }}
            onFinish={data => {
                const password = data.password;
                resetPassword({
                    password: encrypt(password),
                }).then(() => {
                    message.success('更改密码成功！');
                });
            }}
        >
            <Form.Item>
                <Form.Item
                    name="password"
                    label="新的密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password size="large" placeholder="请输入密码" />
                </Form.Item>
                <p>密码建议使用6位数以上</p>
            </Form.Item>
            <Form.Item>
                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请确认你的密码是否一致!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('两次密码输入不一致!');
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" placeholder="请再次输入密码" />
                </Form.Item>
                <p>此处密码应该和上面一样</p>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="danger" htmlType="submit">
                    改变密码
                </Button>
            </Form.Item>
        </Form>
    );
};
