import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, message, UploadProps } from 'antd';
import { Upload } from 'antd';
import { isEqual, noop } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import config from '@blog/client/configs/admin.default.config';
import dynamic from 'next/dynamic';

const ImageEditor = dynamic(() => import('./ImageEditor'), { ssr: false });

const isImage = (type) => isEqual(type, 'image');
const isSvg = (type) => isEqual(type, 'svg');

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
    const [open, setOpen] = useState({
        visible: false,
        src: '',
        type: '',
        name: '',
        uid: '',
    });
    const refResolve = useRef(noop);
    const refReject = useRef(noop);
    return (
        <React.Fragment>
            <Upload
                {...updateLoadProps}
                beforeUpload={(file) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                        if (reader.result) {
                            const { type, name, uid } = file;
                            setOpen({
                                visible: true,
                                src: String(reader.result),
                                type,
                                name,
                                uid,
                            });
                        }
                    });
                    reader.readAsDataURL(file);
                    return new Promise((resolve, reject) => {
                        refResolve.current = resolve;
                        refReject.current = reject;
                    });
                }}
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
            {open.visible && (
                <ImageEditor
                    src={open.src}
                    onSave={async (_, designState) => {
                        const res: Response = await fetch(designState.imgSrc);
                        const blob: Blob = await res.blob();
                        if (!blob) return;
                        const { type, name, uid } = open;
                        const newFile = new File([blob], name, { type });
                        (newFile as any).uid = uid;
                        setOpen((d) => ({ ...d, visible: false }));
                        refResolve.current(newFile);
                    }}
                ></ImageEditor>
            )}
        </React.Fragment>
    );
}
