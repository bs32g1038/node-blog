import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import queryString from 'query-string';
import config from '@blog/client/admin/configs/default.config';
import { Form, Input, Upload, Select, Button, message, Row, Modal, Card, Pagination, Empty } from 'antd';
import dynamic from 'next/dynamic';
const MdEdit = dynamic(() => import('@blog/client/admin/components/MdEdit'), { ssr: false });
import axios from '@blog/client/admin/axios';
import EditableTagGroup from '@blog/client/admin/components/EditableTagGroup';
import PageHeaderWrapper from '@blog/client/admin/components/PageHeaderWrapper';
import styled from '@emotion/styled';
import { CloudUploadOutlined, SearchOutlined } from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';

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

const Option = Select.Option;
const { TextArea } = Input;

export default () => {
    const [isShowPictureSelectDialog, setIsShowPictureSelectDialog] = useState(false);
    const [categories, setCategories] = useState([]);
    const [mediaState, setMediaState] = useState({
        loading: false,
        medias: [],
        pagination: {
            current: 1,
            total: 0,
        },
    });
    const router = useRouter();
    const [form] = Form.useForm();
    useEffect(() => {
        const { id } = router.query;
        if (id) {
            axios.all([axios.get('/articles/' + id), axios.get('/categories/')]).then(
                axios.spread((aRes, cRes) => {
                    setCategories(cRes.data);
                    const article = aRes.data;
                    const category = article.category || {};
                    const fileList = article.screenshot
                        ? [
                              {
                                  uid: -1,
                                  status: 'done',
                                  url: article.screenshot,
                              },
                          ]
                        : [];
                    form.setFieldsValue({
                        title: article.title,
                        category: category._id,
                        screenshot: fileList,
                        tags: article.tags,
                        content: article.content || '',
                        summary: article.summary,
                    });
                })
            );
        } else {
            axios.get('/categories/').then(res => {
                setCategories(res.data);
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

    const publish = data => {
        const { id } = router.query;

        Object.assign(data, {
            screenshot: data.screenshot[0].url,
        });
        const p = id ? updateArticle(id, data) : createArticle(data);
        p.then(() => {
            message.success('提交成功 ！');
            Router.push('/admin/content/articles');
        });
    };

    const fetchMediasData = (page = 1, limit = 10) => {
        setMediaState(data => ({ ...data, loading: true }));
        const query = {
            limit,
            page,
        };
        return axios.get('/medias?' + queryString.stringify(query)).then(res => {
            const pagination = { ...mediaState.pagination, current: page };
            pagination.total = res.data.totalCount;
            setMediaState(data => ({ ...data, medias: res.data.items, loading: false, pagination }));
        });
    };

    const categoryOptions =
        categories &&
        categories.map(category => (
            <Option key={category._id} value={category._id}>
                {category.name}
            </Option>
        ));
    const { id } = router.query;
    return (
        <BasicLayout>
            <PanelDiv>
                <PageHeaderWrapper
                    title={id ? '文章编辑' : '添加文章'}
                    content={
                        <>
                            <strong>控制台----文章添加或编辑</strong>
                        </>
                    }
                >
                    <div className="main-content">
                        <Form
                            form={form}
                            onFinish={publish}
                            style={{ marginTop: '20px' }}
                            initialValues={{ content: '' }}
                        >
                            <Form.Item
                                name="title"
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 10 }}
                                label="文章标题："
                                rules={[{ required: true, message: '标题不能为空！，且最多80个字符!', max: 80 }]}
                            >
                                <Input type="text" />
                            </Form.Item>
                            <Form.Item
                                name="category"
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 4 }}
                                label="文章分类："
                                rules={[{ required: true, message: '分类不能为空!' }]}
                            >
                                <Select placeholder="请选择一个分类">{categoryOptions}</Select>
                            </Form.Item>
                            <Form.Item name="tags" labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="文章标签：">
                                <EditableTagGroup />
                            </Form.Item>
                            <Form.Item
                                required={true}
                                label="封面图片："
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 20 }}
                            >
                                <Row>
                                    <Form.Item
                                        name="screenshot"
                                        valuePropName="fileList"
                                        getValueFromEvent={handleUpload}
                                        rules={[{ required: true, message: '封面图片不能为空!' }]}
                                    >
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
                                            <Button icon={<CloudUploadOutlined />}>点击上传</Button>
                                        </Upload>
                                    </Form.Item>
                                    <Button
                                        icon={<SearchOutlined />}
                                        style={{ marginLeft: '20px' }}
                                        onClick={() => {
                                            fetchMediasData().then(() => {
                                                setIsShowPictureSelectDialog(true);
                                            });
                                        }}
                                    >
                                        选择图库中的图片
                                    </Button>
                                    <Modal
                                        width="850px"
                                        title="请选择使用的图片"
                                        visible={isShowPictureSelectDialog}
                                        onOk={() => setIsShowPictureSelectDialog(false)}
                                        onCancel={() => setIsShowPictureSelectDialog(false)}
                                        cancelText="取消"
                                        okText="确定"
                                    >
                                        {mediaState.medias.length <= 0 && (
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        )}
                                        <Row>
                                            {mediaState.medias.map(item => {
                                                return (
                                                    <Card
                                                        key={item.id}
                                                        hoverable
                                                        style={{ width: 135, margin: 10 }}
                                                        loading={mediaState.loading}
                                                        cover={
                                                            <img
                                                                alt={item.originalName}
                                                                src={item.filePath + '/' + item.fileName}
                                                            />
                                                        }
                                                        actions={[
                                                            <Button
                                                                key="viewButton"
                                                                size="small"
                                                                title="使用"
                                                                onClick={() => {
                                                                    form.setFieldsValue({
                                                                        screenshot: [
                                                                            {
                                                                                uid: -1,
                                                                                status: 'done',
                                                                                url:
                                                                                    item.filePath + '/' + item.fileName,
                                                                            },
                                                                        ],
                                                                    });
                                                                    setIsShowPictureSelectDialog(false);
                                                                }}
                                                            >
                                                                使用
                                                            </Button>,
                                                        ]}
                                                    ></Card>
                                                );
                                            })}
                                        </Row>
                                        <Pagination
                                            current={mediaState.pagination.current}
                                            total={mediaState.pagination.total}
                                            pageSize={10}
                                            onChange={(page, pageSize) => {
                                                fetchMediasData(page, pageSize);
                                            }}
                                        />
                                    </Modal>
                                </Row>
                            </Form.Item>

                            <Form.Item
                                name="summary"
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 10 }}
                                label="文章摘要："
                                rules={[{ required: true, message: '文章摘要不能为空，且最多200个字符!', max: 200 }]}
                            >
                                <TextArea placeholder="请输入文章摘要" autoSize={{ minRows: 2, maxRows: 6 }}></TextArea>
                            </Form.Item>
                            <Form.Item
                                name="content"
                                label="文章详情："
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 20 }}
                                rules={[
                                    { required: true, message: '文章详情不能为空，且最多15000个字符!', max: 15000 },
                                ]}
                            >
                                <MdEdit />
                            </Form.Item>
                            <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="操作：">
                                <Button type="primary" htmlType="submit">
                                    发布
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </PageHeaderWrapper>
            </PanelDiv>
        </BasicLayout>
    );
};
