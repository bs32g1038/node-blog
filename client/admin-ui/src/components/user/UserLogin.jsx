import React from 'react';
import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;
import axios from '../../utils/axios.js';

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
        var self = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            //  打印日志，注意清除
            console.log(err)
            console.log(values)
            if (!err) {
                let base_url = '/api/admin/sessions';
                axios.post(base_url, values)
                    .then(function (res) {
                        if (res.status === 200 || res.status === 201) {
                            notification['success']({
                                message: '操作提示',
                                description: '登录成功！',
                            });
                            self.props.router.push('/admin');
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    },
    render() {
        const { getFieldDecorator } = this.props.form;
        return (

            <Form onSubmit={this.handleSubmit} style={{ width: '400px', paddingTop: '20px', margin: '0 auto' }}>
                <FormItem
                    label="账号"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10 }}
                >
                    {getFieldDecorator('account', {
                        rules: [{ required: true, message: '请填写账号！', }],
                    })(
                        <Input type="text" />
                        )}
                </FormItem>
                <FormItem
                    label="密码"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10 }}
                >
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: '请填写密码！' },
                        ]
                    })(
                        <Input type="password" />
                        )}
                </FormItem>
                <FormItem
                    label="操作"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 4 }}
                >
                    <Button type="primary" htmlType="submit" size="large">登录</Button>
                </FormItem>
            </Form>
        );
    },
}));

export default UserBaseInfoForm