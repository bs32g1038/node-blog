import React, { Component } from 'react';
import { Form, Input, Button, Layout, Breadcrumb, notification, Upload, message } from 'antd';
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
    handleUpload(e) {
        if (Array.isArray(e)) {
            return e;
        }
        let fileList = e.fileList;
        fileList = fileList.slice(-1);
        fileList = fileList.map((file) => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        if (e.file.status === 'done') {
            message.success(`${e.file.name} file uploaded successfully`);
        } else if (e.file.status === 'error') {
            message.error(`${e.file.name} file upload failed.`);
        }
        return fileList;
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
        let upload = {
            name: "file",
            action: "/api/admin/medias",
            listType: "picture",
            multiple: false,
            onRemove: () => false
        }
        let fileList = [{
            uid: -1,
            status: 'done',
            url: user.img_url,
        }];
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
                    <div id="m-user-edit-avatar">
                        <FormItem label="头像" labelCol={{ span: 4 }} wrapperCol={{ span: 3 }}>
                            {getFieldDecorator('images', {
                                initialValue: fileList,
                                valuePropName: 'fileList',
                                getValueFromEvent: this.handleUpload,
                            })(
                                <Upload {...upload}>
                                    <Button><i className="fa fa-arrow-up"></i>点击上传</Button>
                                </Upload>
                                )}
                        </FormItem>
                    </div>

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