import React, { useState, useEffect, useCallback } from 'react';
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

const ToastuiEditor = dynamic(() => import('@blog/client/admin/components/ToastuiEditor'), { ssr: false });

const { TextArea } = Input;

export default () => {
    const [editor, setEditor] = useState<any>(null);
    const [data, setData] = useState<any>({
        content: '',
    });
    const router = useRouter();
    const [form] = Form.useForm();
    const [showDrawer, setShowDrawer] = useState(false);

    useEffect(() => {
        isLogin();
    });

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
    }, [1]);

    const createArticle = (data) => {
        return axios.post('/articles', data);
    };

    const updateArticle = (id, data) => {
        return axios.put('/articles/' + id, data);
    };

    const publish = (data) => {
        const { id } = router.query;
        const content = editor.getMarkdown();
        if (!isLength(content, { min: 1, max: 15000 })) {
            return message.error('文章详情不能为空，且最多15000个字符!');
        }
        Object.assign(data, {
            content,
            screenshot: data.screenshot[0].url,
        });
        const p = id ? updateArticle(id, data) : createArticle(data);
        p.then(() => {
            message.success('提交成功 ！');
            Router.push('/admin/content/articles');
        });
    };

    const { id } = router.query;
    const debounceSetData = useCallback(
        debounce((values: any) => {
            setData((data) => ({
                ...data,
                ...values,
            }));
        }),
        [1]
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
            <div className={style.header}>
                <div className={style.leftItem}>
                    <div className={style.name}>
                        <Link href="/admin/content/articles" passHref={true}>
                            <a>
                                <ArrowLeftOutlined></ArrowLeftOutlined>
                                文章列表
                            </a>
                        </Link>
                    </div>
                    <div className={style.type}>{id ? '文章编辑' : '添加文章'}</div>
                </div>
                <div className={style.editorWrap}>
                    <Form form={form} initialValues={{ content: '' }} name="contentForm">
                        <Form.Item
                            name="title"
                            style={{ maxWidth: '700px', width: '100%', margin: '0 auto' }}
                            rules={[{ required: true, message: '标题不能为空！，且最多80个字符!', max: 80 }]}
                        >
                            <TextArea placeholder="请输入标题" rows={1} style={{ textAlign: 'center' }} />
                        </Form.Item>
                    </Form>
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
            <ToastuiEditor initialValue={data.content} getEditor={(e) => setEditor(e)}></ToastuiEditor>
        </Form.Provider>
    );
};
