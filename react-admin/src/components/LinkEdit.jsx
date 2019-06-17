import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../utils/axios';
import { Form, Input, Button, message } from 'antd';
const TextArea = Input.TextArea;
const FormItem = Form.Item;

class LinkEdit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            link: {}
        };
    }
    componentDidMount() {
        const { match } = this.props;
        if (match.params.id) {
            axios.get('/links/' + match.params.id).then((res) => {
                this.setState({
                    link: res.data,
                });
            });
        }
    }
    publish(e) {
        e.preventDefault();
        const { match, history } = this.props;
        this.props.form.validateFields((err, data) => {
            if (!err) {
                const p = match.params.id ? this.updateLink(match.params.id, data) : this.createLink(data);
                p.then((res) => {
                    message.info("提交成功");
                    history.push('/blog/admin/links');
                });
            }
        });
    }
    createLink(data) {
        return axios.post('/links', data);
    }
    updateLink(id, data) {
        return axios.put('/links/' + id, data);
    }
    render() {
        const link = this.state.link;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="main-content">
                <div className="manager-tip">
                    <i className="fa fa-edit fa-fw"></i><strong>控制台----友情链接添加或编辑</strong>
                </div>
                <Form onSubmit={(e) => this.publish(e)} style={{ marginTop: '20px' }} >
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="链接名称："
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '链接名称不能为空！', }],
                            initialValue: link.name
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="链接URL："
                    >
                        {getFieldDecorator('url', {
                            rules: [{ required: true, message: '链接URL不能为空！', }],
                            initialValue: link.url
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="链接描述："
                    >
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: '链接描述不能为空！', }],
                            initialValue: link.description
                        })(
                            <TextArea placeholder="请输入链接描述" autosize={{ minRows: 2, maxRows: 6 }}></TextArea>
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="链接LOGO："
                    >
                        {getFieldDecorator('logo', {
                            rules: [{ required: true, message: '链接LOGO不能为空！', }],
                            initialValue: link.logo
                        })(
                            <Input type="text" />
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
export default withRouter(Form.create()(LinkEdit));