import React, { Component } from 'react';
import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;
import { login } from '../redux/user';
import { connect } from 'react-redux';

class UserLogin extends Component {
    constructor(props) {
        super(props);
        notification.config({
            top: 60,
            duration: 4,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFieldsAndScroll((err, data) => {
            if (!err) {
                dispatch(login(data.account, data.password)).then(() => {
                    notification['success']({
                        message: '操作提示',
                        description: '登录成功！',
                    });
                    this.props.router.push('/admin');
                })
            }
        });
    }
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
            </Form >
        );
    }
};

export default connect()(Form.create()(UserLogin));
