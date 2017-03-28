import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

class CommentReplyForm extends Component {

    render() {
        let { visible, onCancel, onOk, form, comment } = this.props;
        comment = comment || {};
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="回复评论"
                okText="提交"
                onCancel={onCancel}
                onOk={onOk}
            >
                <Form>
                    <FormItem style={{ display: 'none' }}>
                        {getFieldDecorator('reply_id', {
                            initialValue: comment._id
                        })(
                            <Input disabled={true} />
                            )}
                    </FormItem>
                    <FormItem style={{ display: 'none' }}>
                        {getFieldDecorator('article_id', {
                            initialValue: comment.article && comment.article._id
                        })(
                            <Input disabled={true} />
                            )}
                    </FormItem>
                    <FormItem label="昵称" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        <Input disabled={true} value={comment.nick_name} />
                    </FormItem>
                    <FormItem label="内容" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                        <Input value={comment.content} type="textarea" disabled={true} autosize={{ minRows: 1, maxRows: 6 }} />
                    </FormItem>
                    <FormItem label="回复内容" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                        {getFieldDecorator('content')(
                            <Input type="textarea" autosize={{ minRows: 6, maxRows: 8 }} />
                        )}
                    </FormItem>
                </Form>
            </Modal >
        );
    }
}
export default Form.create()(CommentReplyForm);