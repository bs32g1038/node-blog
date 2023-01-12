import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Select, Button, Drawer } from 'antd';
import axios from '@blog/client/admin/axios';
import EditableTagGroup from '@blog/client/admin/components/EditableTagGroup';
import { DeleteFilled, SendOutlined } from '@ant-design/icons';
import useImageUpload from '@blog/client/admin/hooks/useImageUpload';
import style from './style.module.scss';
import ImageCropper from '@blog/client/admin/components/ImageCropper';

const Option = Select.Option;
const { TextArea } = Input;

export default function Index({ visible, onCancel, formData }) {
    const { setImageUrl, UploadButton, handleUpload } = useImageUpload({
        style: {
            width: '100%',
            minHeight: '80px',
            maxHeight: '110px',
        },
    });
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();

    const prevVisibleRef = useRef();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;

    useEffect(() => {
        if (formData) {
            setImageUrl(formData.imgUrl);
        }
        if (!visible && prevVisible) {
            form.resetFields();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    useEffect(() => {
        axios.get('/categories/').then((res) => {
            setCategories(res.data);
        });
    }, []);

    const categoryOptions =
        categories &&
        categories.map((category) => (
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
                if (onCancel) {
                    onCancel(false);
                }
            }}
            visible={visible}
        >
            <div className={style.drawerContent}>
                <Form layout="vertical" form={form} name="articleConfigForm" initialValues={formData}>
                    <Form.Item
                        required={true}
                        label="封面图片"
                        name="screenshot"
                        valuePropName="fileList"
                        getValueFromEvent={handleUpload}
                        rules={[{ required: true, message: '封面图片不能为空!' }]}
                    >
                        <ImageCropper aspectRatio={3 / 2} minWidth={300} maxWidth={300} minHeight={200} maxHeight={200}>
                            <UploadButton></UploadButton>
                        </ImageCropper>
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
                        <TextArea placeholder="请输入文章摘要" rows={4}></TextArea>
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
            </div>
        </Drawer>
    );
}
