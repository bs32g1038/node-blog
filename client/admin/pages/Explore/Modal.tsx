import React, { useEffect } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { Form, Modal, Input, Button, Space, message } from 'antd';
import style from './modal.module.scss';
import axios from '@blog/client/admin/axios';

interface Props {
    id?: string;
    visible: boolean;
    onCancel?: () => void;
}

export default (props: Props) => {
    const [form] = Form.useForm();
    useEffect(() => {
        const { id } = props;
        if (id) {
            axios.get('/explore/' + id).then((res) => {
                form.setFieldsValue(res.data);
            });
        }
    }, [props.id]);
    const createExplore = (data) => {
        return axios.post('/explore', data);
    };
    const updateExplore = (id, data) => {
        return axios.put('/explore/' + id, data);
    };
    const publish = (data) => {
        const { id } = props;
        const p = id ? updateExplore(id, data) : createExplore(data);
        p.then(() => {
            message.success('提交成功');
            props?.onCancel();
        });
    };
    return (
        <Modal visible={props.visible} closable={false} footer={null}>
            <Form form={form} onFinish={publish}>
                <Form.Item name="content" rules={[{ required: true, message: '请输入话题' }]}>
                    <Input.TextArea
                        className={style.textarea}
                        placeholder="写下你的令人惊奇的发现"
                        autoSize={{ minRows: 4, maxRows: 7 }}
                    />
                </Form.Item>
                <Form.Item className={style.footer}>
                    <Space>
                        <Button htmlType="submit" type="primary">
                            <SendOutlined />
                            发布话题
                        </Button>
                        <Button onClick={props.onCancel}>取消</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};
