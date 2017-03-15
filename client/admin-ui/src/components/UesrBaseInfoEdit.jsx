import React, { Component } from 'react';
import { Form, Input, Button, Layout, Breadcrumb, notification } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
import axios from 'axios';

class UserBaseInfoForm extends Component {
    constructor(props) {
        super(props)
        notification.config({
            top: 60,
            duration: 4,
        });
        this.state = {
            user: {}
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let base_url = '/api/admin/users/' + this.props.params.account;
                axios.put(base_url, values)
                    .then(function (res) {
                        if (res.status === 200 || res.status === 201) {
                            notification['success']({
                                message: '操作提示',
                                description: '内容已提交成功！',
                            });
                            self.setState({
                                user: res.data,
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
        axios.get('/api/admin/users/' + params.account).then((res) => {
            self.setState({
                user: res.data,
            })
        });
    }
    componentDidMount() {
        this.fetch(this.props.params);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { user } = this.state;
        return (
            <Content>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>用户基础信息编辑</Breadcrumb.Item>
                </Breadcrumb>
                <Form onSubmit={this.handleSubmit} style={{ marginTop: '20px' }}>
                    <FormItem label="昵称" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('nick_name', {
                            rules: [{ required: true, message: '昵称不能为空！', }],
                            initialValue: user.nick_name
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="邮箱" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('email', {
                            rules: [
                                { required: true, message: '请填写邮箱!' },
                            ],
                            initialValue: user.email
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="位置" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('location', {
                            rules: [
                                { required: true, message: '位置不能为空!' },
                            ],
                            initialValue: user.location
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="QQ" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('qq', {
                            initialValue: user.qq
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="头像" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('img_url', {
                            initialValue: user.img_url
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="格言" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('motto', {
                            initialValue: user.motto
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="Github" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('github', {
                            initialValue: user.github
                        })(
                            <Input type="text" />
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

export default Form.create()(UserBaseInfoForm)