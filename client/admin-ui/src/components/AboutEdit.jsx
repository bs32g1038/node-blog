import React, { Component } from 'react';
import { Form, Input, Button, Layout, Breadcrumb, notification } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
import axios from 'axios';
import Editor from './Editor';

class AboutForm extends Component {
    constructor(props) {
        super(props)
        notification.config({
            top: 60,
            duration: 4,
        });
        this.state = {
            about: {}
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let base_url = '/api/admin/abouts/' + this.props.params.id;
                axios.put(base_url, values)
                    .then(function (res) {
                        if (res.status === 200 || res.status === 201) {
                            notification['success']({
                                message: '操作提示',
                                description: '内容已提交成功！',
                            });
                            this.setState({
                                about: res.data,
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    }
    fetch = (params = {}) => {
        let self = this;
        axios.get('/api/admin/abouts/' + params.id).then((res) => {
            self.setState({
                about: res.data,
            })
        });
    }
    componentDidMount() {
        this.fetch(this.props.params);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { about } = this.state;
        return (
            <Content>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>博客关于管理</Breadcrumb.Item>
                    <Breadcrumb.Item>关于信息编辑</Breadcrumb.Item>
                </Breadcrumb>
                <Form onSubmit={this.handleSubmit} style={{ marginTop: '20px' }}>
                    <FormItem label="标题" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '标题不能为空！', }],
                            initialValue: about.title
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="内容" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                        {getFieldDecorator('content', {
                            rules: [
                                { required: true, message: '请填写内容!' },
                            ],
                            initialValue: about.content
                        })(
                            <Editor />
                            )}
                    </FormItem>
                    <FormItem label="操作" labelCol={{ span: 4 }} wrapperCol={{ span: 4 }}>
                        <Button type="primary" htmlType="submit" size="large">提交</Button>
                    </FormItem>
                </Form>
            </Content>
        );
    }
};

export default Form.create()(AboutForm)