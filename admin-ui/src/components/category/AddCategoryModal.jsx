import React from 'react';
import { Modal, Form, Input, Alert } from 'antd';
const FormItem = Form.Item;
const AddCategory = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, categoryId, categoryName, categoryAlias } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="添加分类"
                okText="提交"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form>
                    <Alert message="注意：分类的名称和别称必须唯一，不能重复！"
                        type="warning"
                        closable
                    />
                    <FormItem
                        style={{ display: 'none' }}
                    >
                        {getFieldDecorator('id', {
                            initialValue: categoryId
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        label="名称"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 10 }}
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入分类名称!' }],
                            initialValue: categoryName
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        label="别称"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 10 }}
                    >
                        {getFieldDecorator('alias', {
                            rules: [{ required: true, message: '请输入分类别称!' }],
                            initialValue: categoryAlias
                        })(
                            <Input />
                            )}
                    </FormItem>
                </Form>
            </Modal >
        );
    }
);

export default AddCategory;