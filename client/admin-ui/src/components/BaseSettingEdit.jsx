import React, { Component } from 'react';
import { Form, Input, Button, Layout, Breadcrumb, notification } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
import axios from 'axios';

class BaseSettingForm extends Component {
    constructor(props) {
        super(props)
        notification.config({
            top: 60,
            duration: 4,
        });
        this.state = {
            setting: {}
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let base_url = '/api/admin/settings/' + this.props.params.id;
                axios.put(base_url, values)
                    .then(function (res) {
                        if (res.status === 200 || res.status === 201) {
                            notification['success']({
                                message: '操作提示',
                                description: '内容已提交成功！',
                            });
                            self.setState({
                                setting: res.data,
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    }
    fetch(params = {}) {
        let self = this;
        axios.get('/api/admin/settings/' + params.id).then((res) => {
            self.setState({
                setting: res.data,
            })
        });
    }
    componentDidMount() {
        this.fetch(this.props.params);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { setting } = this.state;
        return (
            <Content>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>博客配置管理</Breadcrumb.Item>
                    <Breadcrumb.Item>基础配置信息编辑</Breadcrumb.Item>
                </Breadcrumb>
                <Form onSubmit={this.handleSubmit} style={{ marginTop: '20px' }}>
                    <FormItem label="网站名称" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('site_name', {
                            rules: [{ required: true, message: '网站名称不能为空！', }],
                            initialValue: setting.site_name
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="网站描述" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('site_description', {
                            rules: [
                                { required: true, message: '请填写内容!' },
                            ],
                            initialValue: setting.site_description
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="网站关键词" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('site_keywords', {
                            rules: [
                                { required: true, message: '请填写关键词!' },
                            ],
                            initialValue: setting.site_keywords
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="网站Logo" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('site_logo', {
                            rules: [
                                { required: true, message: '请填写Logo!' },
                            ],
                            initialValue: setting.site_logo
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="网站备案icp" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('site_icp', {
                            rules: [
                                { required: true, message: '请填写网站备案icp!' },
                            ],
                            initialValue: setting.site_icp
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="网站域名" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('site_domain', {
                            rules: [
                                { required: true, message: '请填写网站域名!' },
                            ],
                            initialValue: setting.site_domain
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="网页头部代码信息" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('site_header_code', {
                            rules: [
                                { required: true, message: '请填写网页头部代码信息!' },
                            ],
                            initialValue: setting.site_header_code
                        })(
                            <Input type="textarea" autosize={{ minRows: 6, maxRows: 8 }} />
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

export default Form.create()(BaseSettingForm)