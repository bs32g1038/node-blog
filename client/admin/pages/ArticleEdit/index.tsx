import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { Form, Input, Button, message } from 'antd';
import MdEdit from '@blog/client/admin/components/MdEdit';
import axios from '@blog/client/admin/axios';
import { ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons';
import { Header, EditorWrap } from './style';
import Drawer from './Drawer';
import Link from 'next/link';
import { isLogin } from '@blog/client/admin/utils/is-login';

const { TextArea } = Input;

export default () => {
    const [data, setData] = useState({});
    const router = useRouter();
    const [form] = Form.useForm();
    const [showDrawer, setShowDrawer] = useState(false);

    useEffect(() => {
        isLogin();
    });

    useEffect(() => {
        const { id } = router.query;
        if (id) {
            axios.get('/articles/' + id).then(res => {
                const article = res.data;
                const category = article.category || {};
                setData({
                    title: article.title,
                    content: article.content || '',
                    category: category._id,
                    screenshot: article.screenshot,
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

    const createArticle = data => {
        return axios.post('/articles', data);
    };

    const updateArticle = (id, data) => {
        return axios.put('/articles/' + id, data);
    };

    const publish = data => {
        const { id } = router.query;
        Object.assign(data, {
            screenshot: data.screenshot[0].response.url,
        });
        const p = id ? updateArticle(id, data) : createArticle(data);
        p.then(() => {
            message.success('提交成功 ！');
            Router.push('/admin/content/articles');
        });
    };

    const { id } = router.query;
    return (
        <Form.Provider
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
            <Header>
                <div className="left-item">
                    <div className="name">
                        <Link href="/admin/content/articles" passHref={true}>
                            <a>
                                <ArrowLeftOutlined></ArrowLeftOutlined>
                                文章列表
                            </a>
                        </Link>
                    </div>
                    <div className="type">{id ? '文章编辑' : '添加文章'}</div>
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
            </Header>
            <EditorWrap>
                <Form form={form} initialValues={{ content: '' }} name="contentForm">
                    <Form.Item
                        name="title"
                        style={{ maxWidth: '700px', width: '100%', margin: '0 auto', textAlign: 'center' }}
                        rules={[{ required: true, message: '标题不能为空！，且最多80个字符!', max: 80 }]}
                    >
                        <TextArea placeholder="请输入标题" autoSize={{ maxRows: 1 }} style={{ textAlign: 'center' }} />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        rules={[{ required: true, message: '文章详情不能为空，且最多15000个字符!', max: 15000 }]}
                    >
                        <MdEdit />
                    </Form.Item>
                </Form>
            </EditorWrap>
        </Form.Provider>
    );
};
