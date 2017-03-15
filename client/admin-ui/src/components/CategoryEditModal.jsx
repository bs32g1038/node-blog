import React, { Component } from 'react';
import { Modal, Form, Input, Alert } from 'antd';
const FormItem = Form.Item;

class CategoryEditForm extends Component {
    render() {
        let { visible, onCancel, onOk, form, category } = this.props;
        category = category || {}
        const { getFieldDecorator } = form;
        return (
            <Modal visible={visible} title="添加分类" okText="提交" onCancel={onCancel} onOk={onOk}>
                <Form>
                    <Alert message="注意：分类的名称和别称必须唯一，不能重复！" type="warning" closable />
                    <FormItem style={{ display: 'none' }} >
                        {getFieldDecorator('id', {
                            initialValue: category._id
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem label="名称" labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入分类名称!' }],
                            initialValue: category.name
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem label="别称" labelCol={{ span: 6 }} wrapperCol={{ span: 10 }} >
                        {getFieldDecorator('alias', {
                            rules: [{ required: true, message: '请输入分类别称!' }],
                            initialValue: category.alias,

                        })(
                            <Input />
                            )}
                    </FormItem>
                </Form>
            </Modal >
        );
    }
}
export default Form.create()(CategoryEditForm);