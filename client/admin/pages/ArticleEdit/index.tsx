import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { Form, Input, Button, message, Select, Spin } from 'antd';
import { ArrowLeftOutlined, BulbOutlined, SendOutlined } from '@ant-design/icons';
import Link from 'next/link';
import isLength from 'validator/lib/isLength';
import style from './style.module.scss';
import dynamic from 'next/dynamic';
import { wrapper } from '@blog/client/redux/store';
import EditableTagGroup from '@blog/client/admin/components/EditableTagGroup';
import UploadImageButton from '@blog/client/admin/components/UploadImageButton';
import { useFetchCategoriesMutation } from '../Categories/service';
import { useCreateArticleMutation, useFetchArticleMutation, useUpdateArticleMutation } from '../Articles/service';

const JEditor = dynamic(() => import('@blog/client/admin/components/JEditor'), { ssr: false });

const { TextArea } = Input;

export default function Index(props) {
    wrapper.useHydration(props);

    const router = useRouter();
    const [form] = Form.useForm();
    const [fetchArticle, { isLoading }] = useFetchArticleMutation();
    const [fetchCategories, { data: categories = [], isLoading: categoryLoading }] = useFetchCategoriesMutation();
    const [createArticle, { isLoading: createLoading }] = useCreateArticleMutation();
    const [updateArticle, { isLoading: updateLoading }] = useUpdateArticleMutation();

    useEffect(() => {
        fetchCategories({ page: 1, limit: 100 });
    }, [fetchCategories]);

    useEffect(() => {
        const { id } = router.query;
        if (id) {
            fetchArticle({ id } as any)
                .unwrap()
                .then((article) => {
                    const category = article.category || {};
                    form.setFieldsValue({
                        title: article.title,
                        content: article.content || '',
                        category: category._id,
                        tags: article.tags,
                        summary: article.summary,
                        screenshot: article.screenshot,
                    });
                });
        }
    }, [fetchArticle, form, router.query]);

    const { id } = router.query;

    const publish = (data) => {
        const { id } = router.query;
        if (!isLength(data?.content, { min: 1, max: 15000 })) {
            return message.error('文章详情不能为空，且最多15000个字符!');
        }
        const p = id ? updateArticle({ id, data } as any) : createArticle(data);
        p.then(() => {
            message.success('提交成功 ！');
            Router.push('/admin/content/articles');
        });
    };

    const categoryOptions =
        categories &&
        categories.map((category) => (
            <Select.Option key={category._id} value={category._id}>
                {category.name}
            </Select.Option>
        ));

    return (
        <Spin spinning={isLoading}>
            <Form
                form={form}
                layout="vertical"
                initialValues={{ content: '' }}
                onFinish={(vals) => {
                    form.validateFields().then(() => {
                        publish({ ...vals, isDraft: false });
                    });
                }}
            >
                <div className={style.header}>
                    <div className={style.leftItem}>
                        <div className={style.name}>
                            <Link href="/admin/content/articles" passHref={true}>
                                <ArrowLeftOutlined></ArrowLeftOutlined>
                                文章列表
                            </Link>
                        </div>
                        <div className={style.type}>{id ? '文章编辑' : '添加文章'}</div>
                    </div>
                    <div className={style.editorWrap}>
                        <Form.Item
                            name="title"
                            style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}
                            rules={[{ required: true, message: '标题不能为空！，且最多80个字符!', max: 80 }]}
                        >
                            <TextArea placeholder="请输入标题" rows={1} style={{ textAlign: 'center' }} />
                        </Form.Item>
                    </div>
                    <section className="view-actions">
                        <Button
                            type="text"
                            onClick={() => {
                                form.validateFields().then(() => {
                                    publish({ ...form.getFieldsValue(), isDraft: true });
                                });
                            }}
                        >
                            <BulbOutlined />
                            存为草稿
                        </Button>
                        <Button htmlType="submit" type="link" loading={createLoading || updateLoading}>
                            <SendOutlined />发 布
                        </Button>
                    </section>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className={style.drawerContent}>
                        <Form.Item
                            required={true}
                            label="封面图片"
                            name="screenshot"
                            rules={[{ required: true, message: '封面图片不能为空!' }]}
                        >
                            <UploadImageButton></UploadImageButton>
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label="文章分类"
                            rules={[{ required: true, message: '分类不能为空!' }]}
                        >
                            <Select loading={categoryLoading} placeholder="请选择一个分类">
                                {categoryOptions}
                            </Select>
                        </Form.Item>
                        <Form.Item name="tags" label="文章标签">
                            <EditableTagGroup />
                        </Form.Item>
                    </div>
                    <Form.Item name="content">
                        <JEditor></JEditor>
                    </Form.Item>
                </div>
            </Form>
        </Spin>
    );
}
