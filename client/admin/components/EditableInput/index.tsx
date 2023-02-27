import React, { useState, useEffect } from 'react';
import { Input, Form, Button } from 'antd';
import { EditOutlined, SendOutlined } from '@ant-design/icons';
import { AutoSizeType } from 'rc-textarea';
import { Rule } from 'antd/lib/form';
import style from './style.module.scss';
import UploadButton from '../UploadButton';

interface Props {
    label: string;
    placeholder?: string;
    extra?: string;
    name: string;
    value?: string;
    loading: boolean;
    type?: 'input' | 'textarea' | 'upload' | 'svg';
    autoSize?: AutoSizeType;
    rules?: Rule[];
    onFinish: (values) => void;
}

export default function Index(props: Props) {
    const { name, placeholder, value, label, loading, type = 'input', autoSize, rules, extra } = props;
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState(true);
    const onFinish = (values) => {
        if (props.onFinish) {
            props.onFinish(values);
        }
    };
    useEffect(() => {
        form.setFieldsValue({ [name]: value });
    }, [form, name, value]);

    const FORM_ITEM = {
        input: <Input placeholder={placeholder} size="large" disabled={disabled} />,
        textarea: <Input.TextArea autoSize={autoSize} placeholder={placeholder} disabled={disabled} />,
        upload: <UploadButton disabled={disabled}></UploadButton>,
        svg: <UploadButton type="svg" disabled={disabled}></UploadButton>,
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
            <Form.Item extra={extra} rules={rules} name={name}>
                {FORM_ITEM[type]}
            </Form.Item>
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
}
