import React, { useState, useEffect } from 'react';
import PageHeaderWrapper from '@blog/client/admin/components/PageHeaderWrapper';
import axios from '@blog/client/admin/axios';
import { Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;
import Router, { useRouter } from 'next/router';

const CategoryEdit = props => {
    const [state, setState] = useState({
        category: {},
    });
    const router = useRouter();
    useEffect(() => {
        const { id } = router.query;
        if (id) {
            axios.get('/categories/' + id).then(res => {
                setState({
                    category: res.data,
                });
            });
        }
    }, [1]);
    const createCategory = data => {
        return axios.post('/categories', data);
    };
    const updateCategory = (id, data) => {
        return axios.put('/categories/' + id, data);
    };
    const publish = e => {
        e.preventDefault();
        const { id } = router.query;
        props.form.validateFields((err, data) => {
            if (!err) {
                const p = id ? updateCategory(id, data) : createCategory(data);
                p.then(() => {
                    message.success('提交成功');
                    Router.push('/admin/content/categories');
                });
            }
        });
    };
    const category = state.category;
    const { getFieldDecorator } = props.form;
    return (
        <PageHeaderWrapper title={category._id ? '分类编辑' : '添加分类'} content="控制台----分类添加或编辑">
            <div className="main-content">
                <Form onSubmit={e => publish(e)} style={{ marginTop: '20px' }}>
                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="分类名称：">
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '分类名称长度要在1-25个字符之间！',
                                    min: 1,
                                    max: 25,
                                },
                            ],
                            initialValue: category.name,
                        })(<Input type="text" />)}
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

export default Form.create()(CategoryEdit);
