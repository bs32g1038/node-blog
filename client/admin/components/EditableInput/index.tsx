import React, { useState, useEffect } from 'react';
import { Input, Form, Button } from 'antd';
import { EditOutlined, SendOutlined } from '@ant-design/icons';
import { AutoSizeType } from 'rc-textarea';
import useImageUpload from '@blog/client/admin/hooks/useImageUpload';
import { isEqual } from 'lodash';
import { Rule } from 'antd/lib/form';
import style from './style.module.scss';

interface Props {
    label: string;
    placeholder?: string;
    extra?: string;
    name: string;
    value?: string;
    loading: boolean;
    type?: 'input' | 'textarea' | 'upload';
    autoSize?: AutoSizeType;
    rules?: Rule[];
    onFinish: (values) => void;
}

export default (props: Props) => {
    const { name, placeholder, value, label, loading, type = 'input', autoSize, rules, extra } = props;
    const [form] = Form.useForm();
    const { setImageUrl, handleUpload, UploadButton } = useImageUpload({
        type: 'svg',
        style: {
            width: '60px',
            height: '60px',
        },
    });
    const [disabled, setDisabled] = useState(true);
    const onFinish = (values) => {
        if (props.onFinish) {
            props.onFinish(values);
        }
    };
    useEffect(() => {
        if (isEqual(type, 'upload')) {
            setImageUrl(value);
            return form.setFieldsValue({
                [name]: [
                    {
                        uid: -1,
                        status: 'done',
                        url: value,
                    },
                ],
            });
        }
        form.setFieldsValue({ [name]: value });
    }, [value]);

    const FORM_ITEM = {
        input: <Input placeholder={placeholder} size="large" disabled={disabled} />,
        textarea: <Input.TextArea autoSize={autoSize} placeholder={placeholder} disabled={disabled} />,
        upload: <UploadButton disabled={disabled}></UploadButton>,
    };

    return (
        <Form form={form} className={style.form} layout="vertical" onFinish={onFinish} wrapperCol={{ span: 16 }}>
            <div className="ant-col ant-form-item-label">
                <label htmlFor={name} title={label}>
                    {label}
                    {disabled && (
                        <Button
                            type="link"
                            onClick={() => {
                                setDisabled(!disabled);
                            }}
                        >
                            <EditOutlined></EditOutlined>编辑
                        </Button>
                    )}
                </label>
            </div>
            {isEqual(type, 'upload') ? (
                <Form.Item extra={extra} valuePropName="fileList" name={name} getValueFromEvent={handleUpload}>
                    {FORM_ITEM[type]}
                </Form.Item>
            ) : (
                <Form.Item extra={extra} rules={rules} name={name}>
                    {FORM_ITEM[type]}
                </Form.Item>
            )}
            {!disabled && (
                <Form.Item className="footer">
                    <Button type="primary" htmlType="submit" loading={loading}>
                        <SendOutlined></SendOutlined>保存
                    </Button>
                    <Button
                        type="default"
                        danger={true}
                        onClick={() => {
                            setDisabled(!disabled);
                            form.setFieldsValue({ [name]: value });
                        }}
                    >
                        取消
                    </Button>
                </Form.Item>
            )}
        </Form>
    );
};
