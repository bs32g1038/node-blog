import React, { useState, useEffect, useRef } from 'react';
import config from '@blog/client/admin/configs/default.config';
import { Form, Input, Upload, Select, Button, message, Drawer } from 'antd';
import axios from '@blog/client/admin/axios';
import EditableTagGroup from '@blog/client/admin/components/EditableTagGroup';
import { DeleteFilled, LoadingOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';

import { DrawerContent } from './style';

const Option = Select.Option;
const { TextArea } = Input;

const beforeUpload = file => {
    if (file.size > 1024 * 1024) {
        message.warning('图片大小最大为 1M ！');
        return false;
    }
    return true;
};

export default ({ visible, onCancel, formData }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();

    const prevVisibleRef = useRef();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;

    useEffect(() => {
        if (formData) {
            const fileList = formData.screenshot
                ? [
                      {
                          uid: -1,
                          status: 'done',
                          url: formData.screenshot,
                      },
                  ]
                : [];
            setImageUrl(formData.screenshot);
            form.setFieldsValue({ ...formData, screenshot: fileList });
        }
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [visible]);

    const handleUpload = info => {
        if (Array.isArray(info)) {
            return info;
        }
        if (info.file.status === 'uploading') {
            setUploading(true);
        }
        if (info.file.status === 'done') {
            setImageUrl(info.file.response.url);
            setUploading(false);
            const fileList =
                info &&
                info.fileList.slice(-1).map(file => {
                    if (file.response) {
                        file.url = file.response.url;
                    }
                    return file;
                });
            return fileList;
        }
        return info && info.fileList;
    };
    const uploadButton = (
        <div>
            {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">上传图片</div>
        </div>
    );
    useEffect(() => {
        axios.get('/categories/').then(res => {
            setCategories(res.data);
        });
    }, [1]);

    const categoryOptions =
        categories &&
        categories.map(category => (
            <Option key={category._id} value={category._id}>
                {category.name}
            </Option>
        ));

    return (
        <Drawer
            width="340px"
            title="文章配置"
            placement="right"
            onClose={() => {
                form.submit();
                if (onCancel) {
                    onCancel(false);
                }
            }}
            visible={visible}
        >
            <DrawerContent>
                <Form layout="vertical" form={form} name="articleConfigForm">
                    <Form.Item
                        required={true}
                        label="封面图片"
                        name="screenshot"
                        valuePropName="fileList"
                        getValueFromEvent={handleUpload}
                        rules={[{ required: true, message: '封面图片不能为空!' }]}
                    >
                        <Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="/api/upload/image"
                            beforeUpload={beforeUpload}
                            accept=".jpg,.jpeg,.png"
                            headers={{
                                authorization:
                                    typeof localStorage !== 'undefined' && localStorage.getItem(config.tokenKey),
                            }}
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="avatar" style={{ width: '100%', minHeight: '80px' }} />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item name="category" label="文章分类" rules={[{ required: true, message: '分类不能为空!' }]}>
                        <Select placeholder="请选择一个分类">{categoryOptions}</Select>
                    </Form.Item>
                    <Form.Item name="tags" label="文章标签">
                        <EditableTagGroup />
                    </Form.Item>
                    <Form.Item
                        name="summary"
                        label="文章摘要"
                        rules={[{ required: true, message: '文章摘要不能为空，且最多800个字符!', max: 800 }]}
                    >
                        <TextArea placeholder="请输入文章摘要" autoSize={{ minRows: 2, maxRows: 6 }}></TextArea>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="link">
                            <SendOutlined />发 布
                        </Button>
                        <Button type="link" danger>
                            <DeleteFilled />删 除
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerContent>
        </Drawer>
    );
};
