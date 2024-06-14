import React, { useEffect, useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import { Form, Input, Button, message, Select, Spin, Popover, Space, Table, Popconfirm } from 'antd';
import { ArrowLeftOutlined, HistoryOutlined, SendOutlined } from '@ant-design/icons';
import Link from 'next/link';
import isLength from 'validator/lib/isLength';
import style from './style.module.scss';
import dynamic from 'next/dynamic';
import { wrapper } from '@blog/client/redux/store';
import UploadImageButton from '@blog/client/admin/components/UploadImageButton';
import { useFetchCategoriesMutation } from '../Categories/service';
import { useCreateArticleMutation, useFetchArticleMutation, useUpdateArticleMutation } from '../Articles/service';
import {
    useCreateDrfatMutation,
    useFetchDrfatMutation,
    useFetchDrfatsMutation,
    useUpdateDrfatMutation,
} from './service';
import { debounce, omit } from 'lodash';
import { timeAgo } from '@blog/client/libs/time';
import BasicLayout from '@blog/client/admin/layouts';
import ActionCard from '../../components/ActionCard';

const JEditor = dynamic(() => import('@blog/client/admin/components/JEditor'), { ssr: false });

const { TextArea } = Input;

export default function Index(props: any) {
    wrapper.useHydration(props);

    const router = useRouter();
    const [form] = Form.useForm();
    const [fetchArticle, { isLoading }] = useFetchArticleMutation();
    const [fetchCategories, { data: categories = [], isLoading: categoryLoading }] = useFetchCategoriesMutation();
    const [createArticle, { isLoading: createLoading }] = useCreateArticleMutation();
    const [updateArticle, { isLoading: updateLoading }] = useUpdateArticleMutation();

    const [fetchDrafts, { isLoading: draftsLoading, data: draftListData }] = useFetchDrfatsMutation();
    const [fetchDraft, { isLoading: draftLoading }] = useFetchDrfatMutation();
    const [createDrfat, { isLoading: createDraftLoading }] = useCreateDrfatMutation();
    const [updateDrfat, { isLoading: updateDraftLoading }] = useUpdateDrfatMutation();

    useEffect(() => {
        fetchCategories({ page: 1, limit: 100 });
    }, [fetchCategories]);

    const { id, type } = router.query;

    useEffect(() => {
        if (id && type != 'draft') {
            fetchArticle({ id } as any)
                .unwrap()
                .then((article) => {
                    const category = article.category || {};
                    form.resetFields();
                    form.setFieldsValue({
                        id: article._id,
                        title: article.title,
                        content: article.content || '',
                        category: category._id,
                        tags: article.tags,
                        summary: article.summary,
                        screenshot: article.screenshot,
                    });
                });
        }
        if (id && type === 'draft') {
            fetchDraft(id)
                .unwrap()
                .then((res) => {
                    const article = res.data;
                    form.resetFields();
                    form.setFieldsValue({
                        id: res._id,
                        title: article.title,
                        content: article.content || '',
                        category: article.category,
                        tags: article.tags,
                        summary: article.summary,
                        screenshot: article.screenshot,
                    });
                });
        }
    }, [fetchDraft, fetchArticle, form, id, type]);

    const publish = (data: { content?: any; id?: any }) => {
        const { id } = data;
        if (!isLength(data?.content, { min: 1, max: 15000 })) {
            return message.error('文章详情不能为空，且最多15000个字符!');
        }
        const p = id ? updateArticle({ id, data: omit(data, 'id') } as any) : createArticle(data);
        p.then(() => {
            message.success('提交成功 ！');
            Router.push('/admin/content/articles');
        });
    };

    const categoryOptions =
        categories &&
        categories.map((category: { _id: string; name: string }) => (
            <Select.Option key={category._id} value={category._id}>
                {category.name}
            </Select.Option>
        ));

    const onValuesChange = useMemo(() => {
        return debounce((_, values) => {
            if (values.id) {
                return updateDrfat({ id: values.id, data: values } as any);
            }
            createDrfat({ data: values })
                .unwrap()
                .then((res) => {
                    form.setFieldsValue({ id: res._id });
                    window.history.replaceState(null, '', '/admin/content/articles/edit/' + res._id + '?type=draft');
                });
        }, 200);
    }, [createDrfat, form, updateDrfat]);
    const CTitle = (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={style.back}>
                <Link href="/admin/content/articles" passHref={true}>
                    <ArrowLeftOutlined></ArrowLeftOutlined>
                    返回文章列表
                </Link>
            </div>
            <section className="view-actions">
                <Spin size="small" spinning={createDraftLoading || updateDraftLoading} />
                <Popover
                    content={
                        <Table
                            style={{ width: '280px' }}
                            size="small"
                            scroll={{ y: 250 }}
                            loading={draftsLoading}
                            dataSource={draftListData?.items ?? []}
                            pagination={{
                                onChange: (page) => {
                                    return fetchDrafts({ page, limit: 10 });
                                },
                                total: draftListData?.totalCount ?? '',
                            }}
                            columns={[
                                {
                                    dataIndex: ['data', 'title'],
                                    title: '标题',
                                    width: '160px',
                                    ellipsis: { showTitle: true },
                                },
                                {
                                    dataIndex: 'createdAt',
                                    title: '创建时间',
                                    width: '100px',
                                    render(createdAt: string) {
                                        return timeAgo(createdAt ?? '');
                                    },
                                },
                            ]}
                            onRow={(record: any) => {
                                return {
                                    onClick: () => {
                                        Router.push({
                                            pathname: '/admin/content/articles/edit/' + record._id,
                                            query: {
                                                type: 'draft',
                                            },
                                        });
                                    },
                                };
                            }}
                        ></Table>
                    }
                    trigger="click"
                    placement="leftBottom"
                >
                    <Button
                        type="text"
                        onClick={() => {
                            return fetchDrafts({ page: 1, limit: 10 });
                        }}
                    >
                        <HistoryOutlined />
                        历史记录
                    </Button>
                </Popover>
                <Popconfirm
                    title="是否发布文章"
                    placement="bottom"
                    onConfirm={() => {
                        form.submit();
                    }}
                >
                    <Button type="link" loading={createLoading || updateLoading}>
                        <SendOutlined />发 布
                    </Button>
                </Popconfirm>
            </section>
        </div>
    );
    return (
        <BasicLayout>
            <ActionCard title={CTitle} bodyStyle={{ padding: 0, background: 'transparent' }}>
                <Spin spinning={isLoading || draftLoading}>
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{ content: '' }}
                        onValuesChange={onValuesChange}
                        onFinish={(vals) => {
                            form.validateFields().then(() => {
                                publish({ ...vals, isDraft: false });
                            });
                        }}
                    >
                        <Form.Item name="id" hidden>
                            <Input />
                        </Form.Item>
                        <div className={style.editorWrap}>
                            <Form.Item
                                name="title"
                                label="文章标题"
                                rules={[{ required: true, message: '标题不能为空！，且最多80个字符!', max: 80 }]}
                            >
                                <TextArea placeholder="请输入标题" rows={1} style={{ textAlign: 'center' }} />
                            </Form.Item>
                            <Space align="start">
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
                                    <Select
                                        style={{ width: 200 }}
                                        loading={categoryLoading}
                                        placeholder="请选择一个分类"
                                    >
                                        {categoryOptions}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="tags" label="文章标签">
                                    <Select
                                        mode="tags"
                                        style={{ width: 270 }}
                                        maxCount={3}
                                        maxTagCount={2}
                                        placeholder="请输入标签"
                                    />
                                </Form.Item>
                            </Space>
                            <Form.Item
                                name="content"
                                label="文章内容"
                                rules={[{ required: true, message: '内容不能为空' }]}
                            >
                                <JEditor></JEditor>
                            </Form.Item>
                        </div>
                    </Form>
                </Spin>
            </ActionCard>
        </BasicLayout>
    );
}
