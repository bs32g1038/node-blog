import React, { useState, useCallback } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import config from '@blog/client/configs/admin.default.config';
import { isEqual } from 'lodash';

function svgBeforeUpload(file) {
    const isSvg = file.type === 'image/svg+xml';
    if (!isSvg) {
        message.error('只能上传svg文件!');
    }
    const isLt100K = file.size / 1024 < 100;
    if (!isLt100K) {
        message.error('svg最大只能上传100K!');
    }
    return isSvg && isLt100K;
}

function beforeUpload(file) {
    const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png' ||
        file.type === 'image/svg+xml';
    if (!isJpgOrPng) {
        message.error('只能上传jpg或者png图片!');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
        message.error('图片最大只能上传10MB!');
    }
    return isJpgOrPng && isLt10M;
}

interface Props {
    style?: object;
    disabled?: boolean;
    type?: 'image' | 'svg';
}

const isImage = (type) => isEqual(type, 'image');
const isSvg = (type) => isEqual(type, 'svg');

const Index = (props: Props) => {
    const { style = {}, disabled = false, type = 'image' } = props;
    const [isUploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleUpload = (info) => {
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
                info.fileList.slice(-1).map((file) => {
                    if (file.response) {
                        file.url = file.response.url;
                    }
                    return file;
                });
            return fileList;
        }

        return info && info.fileList;
    };

    const UploadButton = useCallback(
        (props) => (
            <Upload
                disabled={disabled}
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/files/upload"
                accept={isImage(type) ? '.jpg,.jpeg,.png' : isSvg(type) && '.svg'}
                headers={{
                    authorization: typeof localStorage !== 'undefined' && localStorage.getItem(config.tokenKey),
                }}
                {...props}
                beforeUpload={(file) => {
                    console.log(file);
                    if (isImage(type) && beforeUpload(file)) {
                        return props?.beforeUpload(file) || true;
                    }
                    if (isSvg(type) && svgBeforeUpload(file)) {
                        return props?.beforeUpload(file) || true;
                    }
                }}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt="" style={style} />
                ) : (
                    <div>
                        {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div className="ant-upload-text">上传</div>
                    </div>
                )}
            </Upload>
        ),
        [imageUrl]
    );
    return {
        UploadButton,
        handleUpload,
        setImageUrl,
    };
};

export default Index;
