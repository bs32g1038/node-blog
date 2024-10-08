import React, { useEffect, useState } from 'react';
import { Input, Form, Button, Switch, message } from 'antd';
import { EditOutlined, SendOutlined, CloseOutlined, CheckOutlined, SoundOutlined } from '@ant-design/icons';
import style from './style.module.scss';
import { useTestEmailMutation, useUpdateEmailConfigMutation } from './service';

interface Props {
    data?: object;
}

export default function EmailInput(props: Props) {
    const [testEmail, { isLoading: testEmailLoading }] = useTestEmailMutation();
    const [updateEmailConfig, { isLoading: updateLoading }] = useUpdateEmailConfigMutation();
    const { data } = props;
    const [disabled, setDisabled] = useState(true);
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        updateEmailConfig(values).then(() => {
            message.success('更新成功');
            setDisabled(true);
        });
    };
    useEffect(() => {
        form.setFieldsValue(data);
    }, [data, form, disabled]);
    return (
        <Form form={form} className="form" layout="vertical" onFinish={onFinish} wrapperCol={{ span: 16 }}>
            <div className={style.tip}>
                网站邮箱推送配置
                {disabled && (
                    <Button
                        type="link"
                        danger={true}
                        onClick={() => {
                            setDisabled(!disabled);
                        }}
                    >
                        <EditOutlined></EditOutlined>编辑
                    </Button>
                )}
            </div>
            <Form.Item label="邮箱smtp地址" name="smtpHost">
                <Input size="large" placeholder="请输入邮箱smtp地址" disabled={disabled} />
            </Form.Item>
            <Form.Item label="邮箱地址" name="smtpAuthUser">
                <Input size="large" placeholder="请输入邮箱地址" disabled={disabled} />
            </Form.Item>
            <Form.Item label="邮箱授权密码" name="smtpAuthpass">
                <Input.Password size="large" placeholder="请输入邮箱授权密码" disabled={disabled} />
            </Form.Item>
            <Form.Item
                name="isEnableSmtp"
                valuePropName="checked"
                label="是否开启邮箱推送服务"
                extra="用于注册激活、密码找回等功能验证"
            >
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} disabled={disabled} />
            </Form.Item>
            {!disabled && (
                <Form.Item label="操作">
                    <Button type="primary" htmlType="submit" loading={updateLoading} style={{ marginRight: '10px' }}>
                        <SendOutlined></SendOutlined>保存邮箱配置
                    </Button>
                    <Button
                        style={{ marginRight: '10px' }}
                        loading={testEmailLoading}
                        onClick={() => {
                            testEmail()
                                .unwrap()
                                .then((res) => {
                                    if (res === true) {
                                        return message.success('邮箱配置正常！');
                                    }
                                    message.error('邮箱配置错误！');
                                });
                        }}
                    >
                        <SoundOutlined />
                        测试发送邮件
                    </Button>
                    <Button
                        danger
                        onClick={() => {
                            setDisabled(true);
                        }}
                    >
                        <SendOutlined></SendOutlined>取消
                    </Button>
                </Form.Item>
            )}
        </Form>
    );
}
