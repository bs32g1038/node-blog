import React, { useState, useEffect, forwardRef } from 'react';
import Router, { useRouter } from 'next/router';
import config from '@blog/client/admin/configs/default.config';
import { Form, Input, Upload, Select, Button, message } from 'antd';
import dynamic from 'next/dynamic';
const MdEdit = dynamic(() => import('@blog/client/admin/components/MdEdit'), { ssr: false });
import axios from '@blog/client/admin/axios';
import EditableTagGroup from '@blog/client/admin/components/EditableTagGroup';
import PageHeaderWrapper from '@blog/client/admin/components/PageHeaderWrapper';
import styled from '@emotion/styled';

const PanelDiv = styled.div`
    .ant-upload-list-picture {
        width: auto;
    }
    .ant-upload-list-picture .ant-upload-list-item,
    .ant-upload-list-picture-card .ant-upload-list-item {
        height: 150px;
        border: none;
        img {
            max-width: 180px;
            max-height: 130px;
            width: auto;
            height: auto;
            border: 1px solid #ccc;
            border-radius: 3px;
            padding: 6px;
        }
        .anticon-close {
            display: none;
        }
    }
    .ant-upload-list-picture-card .ant-upload-list-item-thumbnail,
    .ant-upload-list-picture .ant-upload-list-item-thumbnail {
        height: auto;
        width: auto;
        left: 0;
    }
    .ant-upload-list-picture .ant-upload-list-item-name,
    .ant-upload-list-picture-card .ant-upload-list-item-name {
        display: none;
    }
    .ant-upload-list-item-card-actions {
        display: none;
    }
    .ant-upload-list-picture .ant-upload-list-item-progress,
    .ant-upload-list-picture-card .ant-upload-list-item-progress {
        left: 0;
        padding-left: 6px;
        bottom: 8px;
    }
`;

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const C = props => {
    const [state, setState] = useState({
        article: {
            _id: '',
            title: '',
            category: null,
            tags: '',
            summary: '',
            content: '',
        },
        categories: [],
        screenshot: '',
    });
    const router = useRouter();
    useEffect(() => {
        const { id } = router.query;
        if (id) {
            axios.all([axios.get('/articles/' + id), axios.get('/categories/')]).then(
                axios.spread((aRes, cRes) => {
                    setState(data => ({
                        ...data,
                        article: aRes.data,
                        categories: cRes.data,
                        screenshot: aRes.data.screenshot,
                    }));
                })
            );
        } else {
            axios.get('/categories/').then(res => {
                setState(data => ({
                    ...data,
                    categories: res.data,
                }));
            });
        }
    }, [1]);
    const beforeUpload = file => {
        if (file.size > 1024 * 1024) {
            message.warning('图片大小最大为 1M ！');
            return false;
        }
        return true;
    };
    const handleUpload = e => {
        if (Array.isArray(e)) {
            return e;
        }
        let fileList = e.fileList;
        fileList = fileList.slice(-1);

        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        if (e.file.status === 'done') {
            message.success('图片上传成功！');
        } else if (e.file.status === 'error') {
            message.error('图片上传失败！');
        }
        return fileList;
    };

    const createArticle = data => {
        return axios.post('/articles', data);
    };

    const updateArticle = (id, data) => {
        return axios.put('/articles/' + id, data);
    };

    const publish = e => {
        e.preventDefault();
        const { id } = router.query;
        props.form.validateFields((err, data) => {
            Object.assign(data, {
                screenshot: data.screenshot[0].url,
            });
            if (!err) {
                const p = id ? updateArticle(id, data) : createArticle(data);
                p.then(() => {
                    alert('提交成功');
                    Router.push('/admin/content/articles');
                });
            }
        });
    };

    const { article, categories } = state;
    const { getFieldDecorator } = props.form;
    const category = article.category || {};
    const categoryOptions =
        categories && categories.map(category => <Option key={category._id}>{category.name}</Option>);
    const fileList = state.screenshot
        ? [
              {
                  uid: -1,
                  status: 'done',
                  url: state.screenshot,
              },
          ]
        : [];
    return (
        <PanelDiv>
            <PageHeaderWrapper
                title={article._id ? '文章编辑' : '添加文章'}
                content={
                    <>
                        <i className="fa fa-edit fa-fw"></i>
                        <strong>控制台----文章添加或编辑</strong>
                    </>
                }
            >
                <div className="main-content">
                    <Form onSubmit={e => publish(e)} style={{ marginTop: '20px' }}>
                        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="文章标题：">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '标题不能为空！' }],
                                initialValue: article.title,
                            })(<Input type="text" />)}
                        </FormItem>
                        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 3 }} label="文章分类：">
                            {getFieldDecorator('category', {
                                rules: [{ required: true, message: '分类不能为空!' }],
                                initialValue: category._id,
                            })(<Select placeholder="请选择一个分类">{categoryOptions}</Select>)}
                        </FormItem>
                        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="文章标签：">
                            {getFieldDecorator('tags', {
                                initialValue: article.tags,
                            })(<EditableTagGroup />)}
                        </FormItem>
                        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 3 }} label="封面图片：">
                            {getFieldDecorator('screenshot', {
                                initialValue: fileList,
                                valuePropName: 'fileList',
                                getValueFromEvent: handleUpload,
                                rules: [{ required: true, message: '封面图片不能为空!' }],
                            })(
                                <Upload
                                    disabled={false}
                                    action="/api/upload/image"
                                    multiple={false}
                                    name="file"
                                    listType="picture"
                                    accept=".jpg,.jpeg,.png"
                                    headers={{
                                        authorization:
                                            typeof localStorage !== 'undefined' &&
                                            localStorage.getItem(config.tokenKey),
                                    }}
                                    onRemove={() => false}
                                    beforeUpload={beforeUpload}
                                >
                                    <Button>
                                        <i className="fa fa-arrow-up"></i>点击上传
                                    </Button>
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="文章摘要：">
                            {getFieldDecorator('summary', {
                                initialValue: article.summary,
                                rules: [{ required: true, message: '文章摘要不能为空!' }],
                            })(
                                <TextArea placeholder="请输入文章摘要" autoSize={{ minRows: 2, maxRows: 6 }}></TextArea>
                            )}
                        </FormItem>
                        <FormItem label="文章详情：" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
                            {getFieldDecorator('content', {
                                initialValue: article.content || '',
                                rules: [{ required: true, message: '文章详情不能为空!' }],
                            })(<MdEdit />)}
                        </FormItem>
                        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="操作：">
                            <Button type="primary" htmlType="submit">
                                发布
                            </Button>
                            <Button style={{ marginLeft: '10px' }}>存为草稿</Button>
                        </FormItem>
                    </Form>
                </div>
            </PageHeaderWrapper>
        </PanelDiv>
    );
};

export default Form.create()(C);
