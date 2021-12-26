import React, { useEffect, useState } from 'react';
import BasicLayout from '@blog/client/admin/layouts';
import { message } from 'antd';
import isFQDN from 'validator/lib/isFQDN';
import axios from '@blog/client/admin/axios';
import useRequestLoading from '@blog/client/admin/hooks/useRequestLoading';
import EditableInput from '@blog/client/admin/components/EditableInput';
import EmailInput from './EmailInput';
import style from './style.module.scss';

const fetchConfig = () => {
    return axios.get('/configs/admin');
};

const updateConfig = (data) => {
    return axios.put('/configs', data);
};

export default () => {
    const [data, setData] = useState<any>({});
    const { loading, injectRequestLoading } = useRequestLoading();

    const onFinish = (values) => {
        const data = values;
        if (data.siteLogo) {
            Object.assign(data, {
                siteLogo: data.siteLogo[0].url,
            });
        }
        injectRequestLoading(updateConfig(data)).then(() => {
            message.success('更新成功');
        });
    };

    useEffect(() => {
        fetchConfig().then((res) => {
            setData(res.data);
        });
    }, [1]);
    return (
        <BasicLayout>
            <div className={style.wrap}>
                <div className={style.tip}>网站基础信息</div>
                <EditableInput
                    value={data.siteTitle}
                    label="网站标题"
                    name="siteTitle"
                    placeholder="请输入网站标题"
                    loading={loading}
                    onFinish={onFinish}
                ></EditableInput>
                <EditableInput
                    value={data.siteDomain}
                    label="网站域名"
                    name="siteDomain"
                    placeholder="请输入网站域名"
                    loading={loading}
                    onFinish={onFinish}
                    rules={[
                        {
                            validator: (rule, value) => {
                                if (isFQDN(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('请输入正确的网站域名，如www.lizc.net');
                            },
                        },
                    ]}
                ></EditableInput>
                <EditableInput
                    value={data.siteIcp}
                    label="网站备案icp"
                    name="siteIcp"
                    placeholder="请输入备案icp"
                    loading={loading}
                    onFinish={onFinish}
                ></EditableInput>
                <EditableInput
                    type="upload"
                    extra="目前仅支持svg文件上传，使用svg文件logo可以兼容主题换色。"
                    value={data.siteLogo}
                    label="网站LOGO"
                    name="siteLogo"
                    loading={loading}
                    onFinish={onFinish}
                ></EditableInput>
                <div className={style.tip}>网站 META 配置</div>
                <EditableInput
                    type="textarea"
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    value={data.siteMetaKeyWords}
                    label="META keywords"
                    name="siteMetaKeyWords"
                    placeholder="请输入keywords"
                    loading={loading}
                    onFinish={onFinish}
                ></EditableInput>
                <EditableInput
                    type="textarea"
                    autoSize={{ minRows: 3, maxRows: 6 }}
                    value={data.siteMetaDescription}
                    label="META 描述"
                    name="siteMetaDescription"
                    placeholder="请输入描述"
                    loading={loading}
                    onFinish={onFinish}
                ></EditableInput>
                <EmailInput data={data}></EmailInput>
            </div>
        </BasicLayout>
    );
};
