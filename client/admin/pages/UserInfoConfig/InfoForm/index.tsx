import React, { useEffect } from 'react';
import { message } from 'antd';
import { Form, Input, Alert, Button, Divider } from 'antd';
import axios from '@blog/client/admin/axios';
import useImageUpload from '@blog/client/admin/hooks/useImageUpload';
import useRequestLoading from '@blog/client/admin/hooks/useRequestLoading';

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

const getLoginInfo = () => {
    return axios.get('/user/login-info');
};

const updateUserInfo = (data) => {
    return axios.put('/user/update', data);
};

export default function InfoForm() {
    const { loading, injectRequestLoading } = useRequestLoading();
    const { setImageUrl, UploadButton, handleUpload } = useImageUpload({
        style: {
            width: '70px',
            height: '70px',
            borderRadius: '50%',
        },
    });
    const [form] = Form.useForm();

    useEffect(() => {
        getLoginInfo().then((res) => {
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
    }, [form, setImageUrl]);

    const onFinish = (values) => {
        return injectRequestLoading(updateUserInfo({ ...values, avatar: values.avatar[0].url })).then(() => {
            message.success('更新成功！');
        });
    };

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
                <UploadButton></UploadButton>
            </Form.Item>
            <Form.Item
                name="userName"
                label="用户名"
                extra="建议使用一个易记的用户名，方便人们认识你"
                rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
            >
                <Input size="large" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
                name="email"
                label="邮箱"
                extra="邮箱用于接收系统通知"
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
            <Form.Item {...tailFormItemLayout}>
                <Button loading={loading} type="primary" htmlType="submit">
                    保存
                </Button>
            </Form.Item>
            <Divider />
        </Form>
    );
}
