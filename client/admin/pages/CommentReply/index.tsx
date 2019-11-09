import React, { useState, useEffect } from 'react';
import axios from '@blog/client/admin/axios';
import { parseTime } from '@blog/client/libs/time';
import { Form, Input, Button, message } from 'antd';
import PageHeaderWrapper from '@blog/client/admin/components/PageHeaderWrapper';
import Router, { useRouter } from 'next/router';
const TextArea = Input.TextArea;
const FormItem = Form.Item;

const CommentReply = props => {
    const [state, setState] = useState({
        comment: {
            article: {
                _id: '',
                title: '',
            },
            content: '',
            nickName: '',
            email: '',
            createdAt: '',
        },
    });
    const router = useRouter();
    useEffect(() => {
        const { id } = router.query;
        if (id) {
            axios.get('/comments/' + id).then(res => {
                setState({
                    comment: res.data,
                });
            });
        }
    }, [1]);

    const publish = e => {
        e.preventDefault();
        const { id } = router.query;
        props.form.validateFields((err, data) => {
            if (!err) {
                Object.assign(data, { reply: id });
                axios.post('/comments/', data).then(() => {
                    message.success('提交成功');
                    Router.push('/admin/content/comments');
                });
            }
        });
    };

    const comment = state.comment;
    const { getFieldDecorator } = props.form;
    return (
        <PageHeaderWrapper title="文章列表" content="控制台----评论回复">
            <div className="main-content">
                <Form onSubmit={e => publish(e)} style={{ marginTop: '20px' }}>
                    <FormItem style={{ display: 'none' }}>
                        {getFieldDecorator('article', {
                            initialValue: comment.article && comment.article._id,
                        })(<Input type="text" />)}
                    </FormItem>
                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="昵称：">
                        <span className="ant-form-text">{comment.nickName}</span>
                    </FormItem>
                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="email：">
                        <span className="ant-form-text">{comment.email}</span>
                    </FormItem>
                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="创建时间：">
                        <span className="ant-form-text">{parseTime(comment.createdAt)}</span>
                    </FormItem>
                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="文章标题：">
                        <span className="ant-form-text">{comment.article && comment.article.title}</span>
                    </FormItem>
                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="内容：">
                        <span className="ant-form-text">{comment.content}</span>
                    </FormItem>
                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="回复内容：">
                        {getFieldDecorator(
                            'content',
                            {}
                        )(<TextArea placeholder="请输入回复内容" autosize={{ minRows: 2, maxRows: 6 }}></TextArea>)}
                    </FormItem>
                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="操作：">
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </PageHeaderWrapper>
    );
};

export default Form.create()(CommentReply);
