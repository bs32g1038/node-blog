import React, { useState, useCallback } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import config from '@blog/client/admin/configs/default.config';

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传jpg或者png图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片最大只能上传2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default ({ style = {} }) => {
    const [isUploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

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

    const UploadButton = useCallback(
        props => (
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/files/upload"
                beforeUpload={beforeUpload}
                accept=".jpg,.jpeg,.png"
                headers={{
                    authorization: typeof localStorage !== 'undefined' && localStorage.getItem(config.tokenKey),
                }}
                {...props}
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
