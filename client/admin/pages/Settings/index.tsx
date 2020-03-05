import React, { useEffect } from 'react';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';
import { Button, Form, Input, message } from 'antd';
import { Wrap, Tip } from './style';
import { useForm } from 'antd/lib/form/util';
import axios from '../../axios';
import useImageUpload from '@blog/client/admin/hooks/useImageUpload';

const fetchConfig = () => {
    return axios.get('/configs');
};

const updateConfig = data => {
    return axios.put('/configs', data);
};

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default () => {
    const [form] = useForm();

    const { setImageUrl, handleUpload, UploadButton } = useImageUpload({
        style: {
            width: '60px',
            height: '60px',
        },
    });

    const onFinish = values => {
        const isLt100K = values.siteLogo[0].size / (1024 * 100) < 1;
        if (!isLt100K) {
            return message.error('网站logo最大100K!');
        }
        getBase64(values.siteLogo[0].originFileObj, img => {
            updateConfig({
                ...values,
                siteLogo: img,
            }).then(() => {
                message.success('更新成功');
            });
        });
    };

    useEffect(() => {
        fetchConfig().then(res => {
            setImageUrl(res.data.siteLogo);
            const data = {
                ...res.data,
                siteLogo: [
                    {
                        uid: -1,
                        status: 'done',
                        url: res.data.siteLogo,
                    },
                ],
            };
            form.setFieldsValue(data);
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
                    <Form.Item wrapperCol={{ span: 16 }} label="网站域名" name="siteDomain">
                        <Input placeholder="请输入网站域名" size="large" />
                    </Form.Item>
                    <Form.Item
                        valuePropName="fileList"
                        getValueFromEvent={handleUpload}
                        wrapperCol={{ span: 16 }}
                        label="网站LOGO"
                        name="siteLogo"
                    >
                        <UploadButton></UploadButton>
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
