import React, { useState, useEffect } from 'react';
import axios from '@blog/client/admin/axios';
import { parseTime } from '@blog/client/libs/time';
import { Form, Input, Button, message } from 'antd';
import Router, { useRouter } from 'next/router';
import BasicLayout from '@blog/client/admin/layouts';
import { wrapper } from '@blog/client/redux/store';

export default function Index(props) {
    wrapper.useHydration(props);
    const [comment, setComment] = useState({
        article: {
            _id: '',
            title: '',
        },
        content: '',
        nickName: '',
        email: '',
        createdAt: '',
        parentId: '',
    });
    const router = useRouter();
    const [form] = Form.useForm();
    useEffect(() => {
        const { id } = router.query;
        if (id) {
            axios.get('/comments/' + id).then((res) => {
                const comment = res.data;
                form.setFieldsValue({
                    article: comment.article._id,
                });
                setComment(comment);
            });
        }
    }, [form, router.query]);

    const publish = (data) => {
        const { id } = router.query;
        if (comment.parentId) {
            Object.assign(data, { reply: id, parentId: comment.parentId });
        } else {
            Object.assign(data, { reply: id, parentId: id });
        }
        axios.post('/admin/reply-comment/', data).then(() => {
            message.success('提交成功');
            Router.push('/admin/content/comments');
        });
    };

    return (
        <BasicLayout>
            <div className="main-content">
                <Form form={form} onFinish={publish} style={{ marginTop: '20px' }}>
                    <Form.Item name="article" style={{ display: 'none' }}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="昵称：">
                        <span className="ant-form-text">{comment.nickName}</span>
                    </Form.Item>
                    <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="email：">
                        <span className="ant-form-text">{comment.email}</span>
                    </Form.Item>
                    <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="创建时间：">
                        <span className="ant-form-text">{parseTime(comment.createdAt)}</span>
                    </Form.Item>
                    <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="文章标题：">
                        <span className="ant-form-text">{comment.article && comment.article.title}</span>
                    </Form.Item>
                    <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="内容：">
                        <span className="ant-form-text" dangerouslySetInnerHTML={{ __html: comment.content }}></span>
                    </Form.Item>
                    <Form.Item
                        name="content"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="回复内容："
                        rules={[
                            {
                                required: true,
                                message: '回复内容不能为空！',
                                min: 1,
                            },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="请输入回复内容"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        ></Input.TextArea>
                    </Form.Item>
                    <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="操作：">
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </BasicLayout>
    );
}
