import React, { useState, useEffect } from 'react';
import axios from '@blog/client/admin/axios';
import { parseTime } from '@blog/client/libs/time';
import { Form, Input, Button, message } from 'antd';
import PageHeaderWrapper from '@blog/client/admin/components/PageHeaderWrapper';
import Router, { useRouter } from 'next/router';

export default () => {
    const [comment, setComment] = useState({
        article: {
            _id: '',
            title: '',
        },
        content: '',
        nickName: '',
        email: '',
        createdAt: '',
    });
    const router = useRouter();
    const [form] = Form.useForm();
    useEffect(() => {
        const { id } = router.query;
        if (id) {
            axios.get('/comments/' + id).then(res => {
                const comment = res.data;
                form.setFieldsValue(comment);
                setComment(comment);
            });
        }
    }, [1]);

    const publish = data => {
        const { id } = router.query;
        Object.assign(data, { reply: id });
        axios.post('/comments/', data).then(() => {
            message.success('提交成功');
            Router.push('/admin/content/comments');
        });
    };

    return (
        <PageHeaderWrapper title="文章列表" content="控制台----评论回复">
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
                        <span className="ant-form-text">{comment.content}</span>
                    </Form.Item>
                    <Form.Item name="content" labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="回复内容：">
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
        </PageHeaderWrapper>
    );
};
