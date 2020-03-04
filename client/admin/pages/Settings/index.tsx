import React, { useEffect } from 'react';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';
import { Button, Form, Input, message } from 'antd';
import { Wrap, Tip } from './style';
import { useForm } from 'antd/lib/form/util';
import axios from '../../axios';

const fetchConfig = () => {
    return axios.get('/configs');
};

const updateConfig = data => {
    return axios.put('/configs', data);
};

export default () => {
    const [form] = useForm();

    const onFinish = values => {
        updateConfig(values).then(() => {
            message.success('更新成功');
        });
    };

    useEffect(() => {
        fetchConfig().then(res => {
            form.setFieldsValue(res.data);
        });
    }, [1]);
    return (
        <BasicLayout>
            <Wrap>
                <Form form={form} className="form" layout="vertical" onFinish={onFinish}>
                    <Tip>网站基础信息</Tip>
                    <Form.Item wrapperCol={{ span: 16 }} label="网站标题" name="siteTitle">
                        <Input placeholder="请输入网站标题" size="large" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16 }} label="网站LOGO" name="siteLogo">
                        <Input placeholder="请输入网站logo" size="large" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16 }} label="网站备案icp" name="siteIcp">
                        <Input placeholder="请输入备案icp" size="large" />
                    </Form.Item>
                    <Tip>网站 META 配置</Tip>
                    <Form.Item wrapperCol={{ span: 16 }} label="META keywords" name="siteMetaKeyWords">
                        <Input.TextArea placeholder="请输入keywords" autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16 }} label="META 描述" name="siteMetaDescription">
                        <Input.TextArea placeholder="请输入描述" autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </Wrap>
        </BasicLayout>
    );
};
