import React, { useEffect, useState, forwardRef } from 'react';
import axios from '@blog/client/admin/axios';
import MdEdit from '@blog/client/admin/components/MdEdit';
import { Form, Input, Button, message } from 'antd';
import PageHeaderWrapper from '@blog/client/admin/components/PageHeaderWrapper';
const FormItem = Form.Item;
import Router, { useRouter } from 'next/router';

const MdEditInput = forwardRef(props => (
    <div>
        <MdEdit {...props} />
    </div>
));

const DemoEdit = props => {
    const [state, setState] = useState({
        demo: {
            _id: '',
            title: '',
            content: '',
        },
    });
    const router = useRouter();
    useEffect(() => {
        const { id } = router.query;
        if (id) {
            axios.get('/demos/' + id).then(res => {
                setState(data => ({
                    ...data,
                    demo: res.data,
                }));
            });
        }
    }, [1]);
    const createdemo = data => {
        return axios.post('/demos', data);
    };
    const updatedemo = (id, data) => {
        return axios.put('/demos/' + id, data);
    };
    const publish = e => {
        e.preventDefault();
        const { id } = router.query;
        props.form.validateFields((err, data) => {
            if (!err) {
                const p = id ? updatedemo(id, data) : createdemo(data);
                p.then(() => {
                    message.success('提交成功');
                    Router.push('/admin/code/demos');
                });
            }
        });
    };
    const demo = state.demo;
    const { getFieldDecorator } = props.form;
    return (
        <PageHeaderWrapper title={demo._id ? 'demo编辑' : 'demo分类'} content="控制台----demo添加或编辑">
            <div className="main-content">
                <Form onSubmit={e => publish(e)} style={{ marginTop: '20px' }}>
                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="demo标题：">
                        {getFieldDecorator('title', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Demo标题长度要在1-25个字符之间！',
                                    min: 1,
                                    max: 25,
                                },
                            ],
                            initialValue: demo.title || '',
                        })(<Input type="text" placeholder="请输入demo标题：" />)}
                    </FormItem>
                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="代码：">
                        {getFieldDecorator('content', {
                            rules: [
                                {
                                    required: true,
                                },
                            ],
                            initialValue: demo.content || '',
                        })(<MdEditInput />)}
                    </FormItem>
                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="操作：">
                        <Button type="primary" htmlType="submit">
                            发布
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </PageHeaderWrapper>
    );
};

export default Form.create()(DemoEdit);
