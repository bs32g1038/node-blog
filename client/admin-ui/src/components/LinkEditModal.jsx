import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;
class LinkEditForm extends Component {
    render() {
        let { visible, onCancel, onOk, form, link } = this.props;
        link = link || {};
        const { getFieldDecorator } = form;
        return (
            <Modal visible={visible} title={link._id ? "修改链接" : '添加链接'} okText="提交"
                onCancel={onCancel}
                onOk={onOk}
            >
                <Form>
                    <FormItem style={{ display: 'none' }} >
                        {getFieldDecorator('id', {
                            initialValue: link._id
                        })(
                            <Input disabled={true} />
                            )}
                    </FormItem>
                    <FormItem label="名称" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '名称不能为空！', }],
                            initialValue: link.name
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem label="url" labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('url', {
                            rules: [{ required: true, message: 'url不能为空！', }],
                            initialValue: link.url
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                </Form>
            </Modal >
        );
    }
}

export default Form.create()(LinkEditForm)