import React, { useEffect, useState } from 'react';
import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import { Form, Modal, Input, Button, Space, message, Upload, Select } from 'antd';
import styles from './modal.module.scss';
import axios from '@blog/client/admin/axios';
import config from '@blog/client/configs/admin.default.config';
interface Props {
    id?: string;
    visible: boolean;
    onCancel?: () => void;
}

const initLinkForms = [
    {
        title0: '链接',
        link0: '',
    },
];

export default React.memo(function Index(props: Props) {
    const [linkForms, setLinkForms] = useState(initLinkForms);
    const handleUpload = (info) => {
        if (Array.isArray(info)) {
            return info;
        }
        if (info.file.status === 'done') {
            const fileList =
                info &&
                info.fileList.map((file) => {
                    if (file.response) {
                        file.url = file.response.url;
                    }
                    return file;
                });
            return fileList;
        }

        return info && info.fileList;
    };
    const [form] = Form.useForm();
    useEffect(() => {
        if (props.visible) {
            form.setFieldsValue({
                ...initLinkForms[0],
            });
        }
    }, [form, props.visible]);
    useEffect(() => {
        const { id, visible } = props;
        if (id && visible) {
            axios.get('/explore/' + id).then((res) => {
                if (res.data?.links?.length > 0) {
                    setLinkForms(res.data?.links);
                }
                form.setFieldsValue({
                    ...res.data,
                    ...(res.data?.links?.reduce((obj, item, index) => {
                        obj['title' + index] = item.title;
                        obj['link' + index] = item.link;
                        return obj;
                    }, {}) || {}),
                    pics: res.data.pics.map((item, index) => ({
                        uid: index,
                        status: 'done',
                        url: item,
                    })),
                });
            });
        }
    }, [form, props]);
    const createExplore = (data) => {
        return axios.post('/explore', data);
    };
    const updateExplore = (id, data) => {
        return axios.put('/explore/' + id, data);
    };
    const publish = (data) => {
        const { id } = props;
        const value = { ...data };
        value.links = Object.keys(value)
            .map((_, index) => {
                return {
                    title: value['title' + index],
                    link: value['link' + index],
                };
            })
            .filter((item) => item.link);
        Object.assign(value, {
            pics:
                value.pics?.map((item) => {
                    return item.url;
                }) || [],
        });
        const p = id ? updateExplore(id, value) : createExplore(value);
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
                        className={styles.textarea}
                        placeholder="写下你的令人惊奇的发现"
                        autoSize={{ minRows: 4, maxRows: 7 }}
                    />
                </Form.Item>
                {linkForms.map((item, index) => {
                    return (
                        <div className={styles.group} key={'link--' + index}>
                            <Button
                                size="small"
                                className={styles.actionButton}
                                type="link"
                                icon={<PlusOutlined></PlusOutlined>}
                                onClick={() => {
                                    setLinkForms((val) => {
                                        return [
                                            ...val,
                                            {
                                                title0: '链接',
                                                link0: '',
                                            },
                                        ];
                                    });
                                }}
                            >
                                添加链接
                            </Button>
                            <Space>
                                <Form.Item
                                    label="链接"
                                    name={'title' + index}
                                    rules={[{ required: true, message: '请输入' }]}
                                >
                                    <Select style={{ width: 120 }}>
                                        <Select.Option value="网站">网站</Select.Option>
                                        <Select.Option value="文档">文档</Select.Option>
                                        <Select.Option value="Github">Github</Select.Option>
                                        <Select.Option value="链接">链接</Select.Option>
                                        <Select.Option value="推特">推特</Select.Option>
                                        <Select.Option value="微博">微博</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name={'link' + index} style={{ width: '100%' }}>
                                    <Input placeholder="请输入链接地址" />
                                </Form.Item>
                            </Space>
                        </div>
                    );
                })}
                <Form.Item name="pics" valuePropName="fileList" getValueFromEvent={handleUpload}>
                    <Upload
                        name="file"
                        action="/api/files/upload"
                        listType="picture-card"
                        headers={{
                            authorization: typeof localStorage !== 'undefined' && localStorage.getItem(config.tokenKey),
                        }}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item className={styles.footer}>
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
});
