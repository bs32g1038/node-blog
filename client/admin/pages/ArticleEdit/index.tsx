import React, { useState, useEffect, useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import { Form, Input, Button, message } from 'antd';
import axios from '@blog/client/admin/axios';
import { ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons';
import Drawer from './Drawer';
import Link from 'next/link';
import { isLogin } from '@blog/client/admin/api/is.login.api';
import { debounce } from 'lodash';
import isLength from 'validator/lib/isLength';
import dynamic from 'next/dynamic';
import style from './style.module.scss';

const JEditor = dynamic(() => import('@blog/client/admin/components/JEditor'), { ssr: false });

const { TextArea } = Input;

export default function Index() {
    const [data, setData] = useState<any>({
        content: '',
    });
    const router = useRouter();
    const [form] = Form.useForm();
    const [showDrawer, setShowDrawer] = useState(false);

    useEffect(() => {
        isLogin();
    }, []);

    useEffect(() => {
        const { id } = router.query;
        if (id) {
            axios.get('/articles/' + id).then((res) => {
                const article = res.data;
                const category = article.category || {};
                setData({
                    title: article.title,
                    content: article.content || '',
                    category: category._id,
                    screenshot: [
                        {
                            uid: -1,
                            status: 'done',
                            url: article.screenshot,
                        },
                    ],
                    tags: article.tags,
                    summary: article.summary,
                    imgUrl: article.screenshot,
                });
                form.setFieldsValue({
                    title: article.title,
                    content: article.content || '',
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createArticle = (data) => {
        return axios.post('/articles', data);
    };

    const updateArticle = (id, data) => {
        return axios.put('/articles/' + id, data);
    };

    const publish = (data) => {
        const { id } = router.query;
        if (!isLength(data?.content, { min: 1, max: 15000 })) {
            return message.error('文章详情不能为空，且最多15000个字符!');
        }
        Object.assign(data, {
            content: data?.content,
            screenshot: data.screenshot[0].url,
        });
        const p = id ? updateArticle(id, data) : createArticle(data);
        p.then(() => {
            message.success('提交成功 ！');
            Router.push('/admin/content/articles');
        });
    };

    const { id } = router.query;
    const debounceSetData = useMemo(
        () =>
            debounce((values: any) => {
                setData((data) => ({
                    ...data,
                    ...values,
                }));
            }),
        []
    );

    return (
        <Form.Provider
            onFormChange={(name, { forms }) => {
                if (name === 'articleConfigForm') {
                    const { articleConfigForm } = forms;
                    const values = articleConfigForm.getFieldsValue();
                    debounceSetData(values);
                }
            }}
            onFormFinish={(name, { values, forms }) => {
                if (name === 'contentForm') {
                    setShowDrawer(true);
                } else {
                    const { contentForm } = forms;
                    const data = contentForm.getFieldsValue();
                    publish({ ...values, ...data });
                }
            }}
        >
            <Form form={form} initialValues={{ content: '' }} name="contentForm">
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
                            style={{ maxWidth: '700px', width: '100%', margin: '0 auto' }}
                            rules={[{ required: true, message: '标题不能为空！，且最多80个字符!', max: 80 }]}
                        >
                            <TextArea placeholder="请输入标题" rows={1} style={{ textAlign: 'center' }} />
                        </Form.Item>
                    </div>
                    <section className="view-actions">
                        <Button
                            type="link"
                            onClick={() => {
                                form.submit();
                            }}
                        >
                            <SettingOutlined></SettingOutlined>
                            发布
                        </Button>
                        <Drawer
                            formData={data}
                            visible={showDrawer}
                            onCancel={() => {
                                setShowDrawer(false);
                            }}
                        ></Drawer>
                    </section>
                </div>
                <Form.Item name="content">
                    <JEditor></JEditor>
                </Form.Item>
            </Form>
        </Form.Provider>
    );
}
