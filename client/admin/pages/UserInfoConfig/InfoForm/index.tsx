import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Alert, Button, Divider } from 'antd';
import config from '@blog/client/admin/configs/default.config';
import axios from '@blog/client/admin/axios';

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const getLoginInfo = () => {
    return axios.get('/user/login-info');
};

const updateUserInfo = data => {
    return axios.put('/user/update', data);
};

export default () => {
    const [isUploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [form] = Form.useForm();

    useEffect(() => {
        getLoginInfo().then(res => {
            const avatar = [
                {
                    uid: -1,
                    status: 'done',
                    url: res.data.avatar,
                },
            ];
            setImageUrl(res.data.avatar);
            form.setFieldsValue({ ...res.data, avatar });
        });
    }, [1]);

    const onFinish = values => {
        return updateUserInfo({ ...values, avatar: values.avatar[0].url }).then(() => {
            message.success('更新成功！');
        });
    };

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
            <div className="ant-upload-text">上传</div>
        </div>
    );

    return (
        <Form
            layout="vertical"
            form={form}
            name="UserForm"
            onFinish={onFinish}
            scrollToFirstError
            style={{ maxWidth: '540px', margin: '0 auto', width: '100%' }}
        >
            <Alert
                message="数据更改后，将会在下次登录生效！"
                type="warning"
                showIcon={true}
                style={{ marginBottom: '10px' }}
            />
            <Form.Item
                required={true}
                label="头像"
                name="avatar"
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
                        authorization: typeof localStorage !== 'undefined' && localStorage.getItem(config.tokenKey),
                    }}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
            </Form.Item>
            <Form.Item>
                <Form.Item
                    name="userName"
                    label="用户名"
                    rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                >
                    <Input size="large" placeholder="请输入用户名" />
                </Form.Item>
                <p>建议使用一个易记的用户名，方便人们认识你</p>
            </Form.Item>
            <Form.Item>
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input size="large" placeholder="请输入邮箱" />
                </Form.Item>
                <p>邮箱用于接收系统通知</p>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
            </Form.Item>
            <Divider />
        </Form>
    );
};
