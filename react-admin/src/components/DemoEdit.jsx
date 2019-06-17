import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../utils/axios';
import MdEdit from './MdEdit';

import { Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

class DemoEdit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            demo: {}
        };
    }
    componentDidMount() {
        const { match } = this.props;
        if (match.params.id) {
            axios.get('/demos/' + match.params.id).then((res) => {
                this.setState({
                    demo: res.data,
                });
            });
        }
    }
    publish(e) {
        e.preventDefault();
        const { match, history } = this.props;
        this.props.form.validateFields((err, data) => {
            if (!err) {
                const p = match.params.id ? this.updatedemo(match.params.id, data) : this.createdemo(data);
                p.then((res) => {
                    message.success("提交成功");
                    history.push('/blog/admin/demos');
                });
            }
        });
    }
    createdemo(data) {
        return axios.post('/demos', data);
    }
    updatedemo(id, data) {
        return axios.put('/demos/' + id, data);
    }
    render() {
        const demo = this.state.demo;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="main-content">
                <div className="manager-tip">
                    <i className="fa fa-edit fa-fw"></i><strong>控制台----代码demo添加或编辑</strong>
                </div>
                <Form onSubmit={(e) => this.publish(e)} style={{ marginTop: '20px' }} >
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="demo标题："
                    >

                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: 'Demo标题长度要在1-25个字符之间！',
                                min: 1,
                                max: 25
                            }],
                            initialValue: demo.title || ''
                        })(
                            <Input type="text" placeholder="请输入demo标题：" />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="代码："
                    >
                        {getFieldDecorator('content', {
                            rules: [{
                                required: true
                            }],
                            initialValue: demo.content || ''
                        })(
                            <MdEdit />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="操作："
                    >
                        <Button type="primary" htmlType="submit">发布</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default withRouter(Form.create()(DemoEdit));