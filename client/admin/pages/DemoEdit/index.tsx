import React, { useEffect, useState } from 'react';
import axios from '@blog/client/admin/axios';
import dynamic from 'next/dynamic';
const MdEdit = dynamic(() => import('@blog/client/admin/components/MdEdit'), { ssr: false });
import { Form, Input, Button, message } from 'antd';
import Router, { useRouter } from 'next/router';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';

export default () => {
    const [demo, setDemo] = useState({
        _id: '',
        title: '',
        content:
            '```head\n<style>div { font-size: 14px }</style>\n```\n\n```html\n<div class="test">测试数据</div>\n```\n\n```css\n.test { border: 1px solid #ccc }\n```\n\n```javascript\nconsole.log("元素带有一个边框") \n```',
    });
    const router = useRouter();
    const [form] = Form.useForm();
    useEffect(() => {
        const { id } = router.query;
        if (id) {
            axios.get('/demos/' + id).then(res => {
                setDemo(data => ({
                    ...data,
                    ...res.data,
                }));
                form.setFieldsValue(res.data);
            });
        }
    }, [1]);
    const createdemo = data => {
        return axios.post('/demos', data);
    };
    const updatedemo = (id, data) => {
        return axios.put('/demos/' + id, data);
    };
    const publish = data => {
        const { id } = router.query;
        const p = id ? updatedemo(id, data) : createdemo(data);
        p.then(() => {
            message.success('提交成功');
            Router.push('/admin/code/demos');
        });
    };
    return (
        <BasicLayout>
            <div className="main-content">
                <Form form={form} onFinish={publish} style={{ marginTop: '20px' }} initialValues={{ content: '' }}>
                    <Form.Item
                        name="title"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="demo标题："
                        rules={[
                            {
                                required: true,
                                message: 'Demo标题长度要在1-25个字符之间！',
                                min: 1,
                                max: 25,
                            },
                        ]}
                    >
                        <Input type="text" placeholder="请输入demo标题：" />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="代码："
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <MdEdit />
                    </Form.Item>
                    <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="操作：">
                        <Button type="primary" htmlType="submit">
                            发布
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </BasicLayout>
    );
};
