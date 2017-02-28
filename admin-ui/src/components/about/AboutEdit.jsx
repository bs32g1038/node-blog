import React from 'react';
import { Form, Input, Button, Layout, Breadcrumb, notification } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
import axios from '../../utils/axios.js';
import Editor from '../common/Editor';

const UserBaseInfoForm = Form.create()(React.createClass({
    getInitialState() {
        notification.config({
            top: 60,
            duration: 4,
        });
        return {
            user: {}
        };
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            //  打印日志，注意清除
            console.log(err)
            console.log(values)
            if (!err) {
                let base_url = 'http://127.0.0.1/api/admin/abouts/' + this.props.params.id;
                axios.put(base_url, values)
                    .then(function (res) {
                        if (res.status === 200 || res.status === 201) {
                            notification['success']({
                                message: '操作提示',
                                description: '内容已提交成功！',
                            });
                            this.setState({
                                user: res.data,
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    },
    fetch(params = {}) {
        let self = this;
        axios.get('/api/admin/abouts/' + params.id).then((res) => {
            self.setState({
                user: res.data,
            })
        });
    },
    componentDidMount() {
        this.fetch(this.props.params);
    },
    render() {
        const { getFieldDecorator } = this.props.form;
        const user = this.state.user || {};
        return (
            <Content>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>博客关于管理</Breadcrumb.Item>
                    <Breadcrumb.Item>关于信息编辑</Breadcrumb.Item>
                </Breadcrumb>

                <Form onSubmit={this.handleSubmit} style={{ marginTop: '20px' }}>
                    <FormItem
                        label="标题"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 10 }}
                    >
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '标题不能为空！', }],
                            initialValue: user.title
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem
                        label="内容"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                    >
                        {getFieldDecorator('content', {
                            rules: [
                                { required: true, message: '请填写内容!' },
                            ],
                            initialValue: user.content
                        })(
                            <Editor />
                            )}
                    </FormItem>
                    <FormItem
                        label="操作"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 4 }}
                    >
                        <Button type="primary" htmlType="submit" size="large">提交</Button>
                    </FormItem>
                </Form>
            </Content>
        );
    },
}));

export default UserBaseInfoForm