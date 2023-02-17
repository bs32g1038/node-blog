import React, { useEffect } from 'react';
import { Form, Input, Select, Button, Drawer } from 'antd';
import EditableTagGroup from '@blog/client/admin/components/EditableTagGroup';
import { DeleteFilled, SendOutlined } from '@ant-design/icons';
import style from './style.module.scss';
import UploadImageButton from '@blog/client/admin/components/UploadImageButton';
import { useFetchCategoriesMutation } from '../../Categories/service';

const Option = Select.Option;
const { TextArea } = Input;

export default function Index({ visible, onCancel, formData }) {
    const [fetchCategories, { data: categories = [], isLoading }] = useFetchCategoriesMutation();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(formData);
    }, [form, formData]);

    useEffect(() => {
        fetchCategories({ page: 1, limit: 100 });
    }, [fetchCategories]);

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
            open={visible}
            destroyOnClose
        >
            <div className={style.drawerContent}>
                <Form layout="vertical" form={form} name="articleConfigForm" initialValues={formData}>
                    <Form.Item
                        required={true}
                        label="封面图片"
                        name="screenshot"
                        rules={[{ required: true, message: '封面图片不能为空!' }]}
                    >
                        <UploadImageButton></UploadImageButton>
                    </Form.Item>
                    <Form.Item name="category" label="文章分类" rules={[{ required: true, message: '分类不能为空!' }]}>
                        <Select loading={isLoading} placeholder="请选择一个分类">
                            {categoryOptions}
                        </Select>
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
