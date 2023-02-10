import React, { useEffect } from 'react';
import BasicLayout from '@blog/client/admin/layouts';
import { message } from 'antd';
import isFQDN from 'validator/lib/isFQDN';
import EditableInput from '@blog/client/admin/components/EditableInput';
import EmailInput from './EmailInput';
import style from './style.module.scss';
import { useLazyFetchAdminConfigsQuery, useUpdateAdminConfigsMutation } from './service';

export default function Settings() {
    const [fetchConfig, { data = {} }] = useLazyFetchAdminConfigsQuery();
    const [updateConfig, { isLoading }] = useUpdateAdminConfigsMutation();
    const onFinish = (values) => {
        const data = values;
        if (data.siteLogo) {
            Object.assign(data, {
                siteLogo: data.siteLogo[0].url,
            });
        }
        updateConfig(data).then(() => {
            message.success('更新成功');
        });
    };

    useEffect(() => {
        fetchConfig();
    }, [fetchConfig]);
    return (
        <BasicLayout>
            <div className={style.wrap}>
                <div className={style.tip}>网站基础信息</div>
                <EditableInput
                    value={data.siteTitle}
                    label="网站标题"
                    name="siteTitle"
                    placeholder="请输入网站标题"
                    loading={isLoading}
                    onFinish={onFinish}
                ></EditableInput>
                <EditableInput
                    value={data.siteDomain}
                    label="网站域名"
                    name="siteDomain"
                    placeholder="请输入网站域名"
                    loading={isLoading}
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
                    loading={isLoading}
                    onFinish={onFinish}
                ></EditableInput>
                <EditableInput
                    type="upload"
                    extra="目前仅支持svg文件上传，使用svg文件logo可以兼容主题换色。"
                    value={data.siteLogo}
                    label="网站LOGO"
                    name="siteLogo"
                    loading={isLoading}
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
                    loading={isLoading}
                    onFinish={onFinish}
                ></EditableInput>
                <EditableInput
                    type="textarea"
                    autoSize={{ minRows: 3, maxRows: 6 }}
                    value={data.siteMetaDescription}
                    label="META 描述"
                    name="siteMetaDescription"
                    placeholder="请输入描述"
                    loading={isLoading}
                    onFinish={onFinish}
                ></EditableInput>
                <EmailInput data={data}></EmailInput>
            </div>
        </BasicLayout>
    );
}
