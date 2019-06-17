import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../utils/axios';
import { parseTime } from '../utils/time';
import { Form, Input, Button, message } from 'antd';
const TextArea = Input.TextArea;
const FormItem = Form.Item;

class GuestbookReply extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            guestbook: {}
        };
    }
    componentDidMount() {
        const { match } = this.props;
        axios.get('/guestbooks/' + match.params.id).then((res) => {
            this.setState({
                guestbook: res.data,
            });
        });
    }
    publish(e) {
        e.preventDefault();
        const { match, history } = this.props;
        this.props.form.validateFields((err, data) => {
            if (!err) {
                axios.put('/guestbooks/' + match.params.id, data).then((res) => {
                    message.success("提交成功");
                    history.push('/blog/admin/guestbooks');
                });
            }
        });
    }
    render() {
        const guestbook = this.state.guestbook;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="main-content">
                <div className="manager-tip">
                    <i className="fa fa-edit fa-fw"></i><strong>控制台----留言回复</strong>
                </div>
                <Form onSubmit={(e) => this.publish(e)} style={{ marginTop: '20px' }} >
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="昵称："
                    >
                        <span className="ant-form-text">{guestbook.nickName}</span>
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="email："
                    >
                        <span className="ant-form-text">{guestbook.email}</span>
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="创建时间："
                    >
                        <span className="ant-form-text">{parseTime(guestbook.createdAt)}</span>
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="内容："
                    >
                        <span className="ant-form-text">{guestbook.content}</span>
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="回复内容：："
                    >
                        {getFieldDecorator('content', {})(
                            <TextArea placeholder="请输入回复内容" autosize={{ minRows: 2, maxRows: 6 }}></TextArea>
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="操作："
                    >
                        <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default withRouter(Form.create()(GuestbookReply));