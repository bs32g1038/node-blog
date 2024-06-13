import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, message, UploadProps } from 'antd';
import { Upload } from 'antd';
import { isEqual, noop } from 'lodash';
import React, { useEffect, useState } from 'react';
import config from '@blog/client/configs/admin.default.config';

const isImage = (type: string) => isEqual(type, 'image');
const isSvg = (type: string) => isEqual(type, 'svg');

interface Props {
    value?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    type?: 'image' | 'svg';
}

export default function UploadButton(props: Props) {
    const { value, onChange = noop, disabled, type = 'image' } = props;
    const [fileList, setFileList] = useState<any>([]);
    useEffect(() => {
        if (fileList.length <= 0 && value) {
            setFileList([
                {
                    status: 'done',
                    url: value,
                },
            ]);
        }
    }, [fileList, value]);
    const [isUploading, setUploading] = useState(false);
    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setUploading(true);
        }
        if (info.file.status === 'done') {
            setUploading(false);
        }
        if (info.file.status === 'error') {
            setUploading(false);
            message.error(info.file?.response?.message);
            return;
        }
        let newFileList = [...info.fileList];
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList.slice(-2);
        // 2. Read from response and show file link
        newFileList = newFileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response?.url;
                onChange(file.response?.url);
            }
            return file;
        });
        setFileList(newFileList);
    };
    const updateLoadProps = {
        action: '/api/files/upload',
        onChange: handleChange,
        multiple: true,
    };
    return (
        <React.Fragment>
            <Upload
                {...(updateLoadProps as any)}
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
                showUploadList={false}
                disabled={disabled}
                accept={isImage(type) ? '.jpg,.jpeg,.png' : isSvg(type) && '.svg'}
                headers={{
                    authorization: typeof localStorage !== 'undefined' && localStorage.getItem(config.tokenKey),
                }}
            >
                {value ? (
                    <Image preview={false} src={value} alt="" />
                ) : (
                    <div>
                        {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div className="ant-upload-text">上传</div>
                    </div>
                )}
            </Upload>
        </React.Fragment>
    );
}
