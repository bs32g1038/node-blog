import React from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;
const ReplyComment = Form.create()(
    (props) => {
        const { visible, onCancel, onSubmit, form, guestbook } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="回复留言"
                okText="提交"
                onCancel={onCancel}
                onOk={onSubmit}
            >
                <Form>
                    <FormItem
                        style={{ display: 'none' }}
                    >
                        {getFieldDecorator('id', {
                            initialValue: guestbook.id
                        })(
                            <Input disabled="true" />
                            )}
                    </FormItem>
                    <FormItem
                        label="昵称"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 10 }}
                    >
                        <Input disabled="true" value={guestbook.nick_name} />
                    </FormItem>
                    <FormItem
                        label="内容"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input value={guestbook.content} type="textarea" disabled="true" autosize={{ minRows: 1, maxRows: 6 }} />
                    </FormItem>
                    <FormItem
                        label="回复内容"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                    >
                        {getFieldDecorator('reply_content', {
                            initialValue: guestbook.reply_content
                        })(
                            <Input type="textarea" autosize={{ minRows: 6, maxRows: 8 }} />
                            )}
                    </FormItem>
                </Form>
            </Modal >
        );
    }
);

export default ReplyComment;