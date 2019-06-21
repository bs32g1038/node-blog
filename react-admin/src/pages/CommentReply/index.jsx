import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import { parseTime } from '../../utils/time';
import { Form, Input, Button, message } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
const TextArea = Input.TextArea;
const FormItem = Form.Item;

class CommentReply extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            comment: {}
        };
    }
    componentDidMount() {
        const { match } = this.props;
        if (match.params.id) {
            axios.get('/comments/' + match.params.id).then((res) => {
                this.setState({
                    comment: res.data,
                });
            });
        }
    }
    publish(e) {
        e.preventDefault();
        const { match, history } = this.props;
        this.props.form.validateFields((err, data) => {
            if (!err) {
                Object.assign(data, { reply: match.params.id });
                axios.post('/comments/', data).then((res) => {
                    message.success("提交成功");
                    history.push('/blog/admin/content/comments');
                });
            }
        });
    }
    render() {
        const comment = this.state.comment;
        const { getFieldDecorator } = this.props.form;
        return (
            <PageHeaderWrapper
                title='文章列表'
                content='控制台----评论回复'
            >
                <div className="main-content">
                    <Form onSubmit={(e) => this.publish(e)} style={{ marginTop: '20px' }} >
                        <FormItem style={{ display: 'none' }}>
                            {getFieldDecorator('article', {
                                initialValue: comment.article && comment.article._id
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 10 }}
                            label="昵称："
                        >
                            <span className="ant-form-text">{comment.nickName}</span>
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 10 }}
                            label="email："
                        >
                            <span className="ant-form-text">{comment.email}</span>
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 10 }}
                            label="创建时间："
                        >
                            <span className="ant-form-text">{parseTime(comment.createdAt)}</span>
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 10 }}
                            label="文章标题："
                        >
                            <span className="ant-form-text">{comment.article && comment.article.title}</span>
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 10 }}
                            label="内容："
                        >
                            <span className="ant-form-text">{comment.content}</span>
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 10 }}
                            label="文章摘要："
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
            </PageHeaderWrapper>
        );
    }
}
export default withRouter(Form.create()(CommentReply));