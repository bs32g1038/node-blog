/* eslint-disable @next/next/no-img-element */
import React, { FC, useCallback, useRef, useState } from 'react';
import { Modal, UploadProps } from 'antd';
import ReactCrop, { Crop } from 'react-image-crop';
import { RcFile } from 'antd/lib/upload/interface';

import styles from './index.module.scss';

import { getCroppedCanvas } from './util';
import { noop } from 'lodash';

export interface ImageCropperProps {
    /**
     * 是否开启裁剪
     *
     * @default true
     */
    crop?: boolean;
    /**
     * 裁切区域宽高比，width / height
     */
    aspectRatio?: number;
    /**
     * 裁剪宽度
     */
    cropWidth?: number;
    /**
     * 裁剪高度
     */
    cropHeight?: number;
    /**
     * 裁剪区域最小宽度
     */
    minWidth?: number;
    /**
     * 裁剪区域最大宽度
     */
    maxWidth?: number;
    /**
     * 裁剪区域最小高度
     */
    minHeight?: number;
    /**
     * 裁剪区域最大高度
     */
    maxHeight?: number;
    /**
     * 图片质量，0 ~ 1
     *
     * @default 1
     */
    quality?: number;
    /**
     * 裁切区域形状是否为圆形
     */
    circularCrop?: boolean;
    /**
     * 显示裁切区域网格（九宫格）
     */
    grid?: boolean;
    /**
     * 弹窗标题
     */
    modalTitle?: string;
    /**
     * 弹窗宽度，px 的数值或百分比
     *
     * @default 600
     */
    modalWidth?: number;
    /**
     * 弹窗确定按钮文字
     *
     * @default '确定'
     */
    modalOk?: string;
    /**
     * 弹窗取消按钮文字
     *
     * @default '取消'
     */
    modalCancel?: string;
}

// 基础裁剪封装
const ImageCropper: FC<ImageCropperProps> = (props) => {
    const {
        children,
        grid,
        quality,
        circularCrop,
        aspectRatio,
        crop: isCrop = true,
        cropHeight,
        cropWidth,
        modalTitle,
        modalCancel,
        modalOk,
        modalWidth,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        ...formUploadProps
    } = props;
    // 图片
    const [imageSrc, setImageSrc] = useState<string>('');
    // 裁剪区域，宽高、位置
    const [crop, setCrop] = useState<Crop>({
        unit: 'px',
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });

    // 图片引用
    const imgRef = useRef<HTMLImageElement>();

    // 上传的文件
    const fileRef = useRef<RcFile>();
    // 原 Upload 组价 beforeUpload 函数
    const beforeUploadRef = useRef();
    // 上传的结果
    const resolveRef = useRef(noop);
    const rejectRef = useRef(noop);

    /**
     * Upload
     */
    const renderUpload = useCallback(() => {
        const upload = Array.isArray(children) ? children[0] : children;
        if (!upload || typeof upload !== 'object') return upload;
        const { beforeUpload, accept, ...restUploadProps } = (upload as any).props;
        // 保留原函数
        beforeUploadRef.current = beforeUpload;

        // 拦截上传
        const handleBeforeUpload: UploadProps['beforeUpload'] = (file: RcFile) => {
            return new Promise((resolve, reject) => {
                fileRef.current = file;
                resolveRef.current = resolve;
                rejectRef.current = reject;

                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    if (reader.result) {
                        setImageSrc(String(reader.result));
                    }
                });
                reader.readAsDataURL(file);
            });
        };

        return {
            ...upload,
            props: {
                ...formUploadProps,
                ...restUploadProps,
                accept: accept || 'image/*',
                beforeUpload: handleBeforeUpload,
            },
        };
    }, [children, formUploadProps]);

    // 图片加载回调
    function onImageLoaded(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        const y = (height - minHeight) / 2;
        const x = (width - minWidth) / 2;
        setCrop((val) => {
            return {
                ...val,
                unit: 'px',
                width: minWidth,
                height: minHeight,
                x,
                y,
            };
        });
    }

    // 关闭弹窗
    const onClose = useCallback(() => {
        setImageSrc('');
    }, []);

    const onOk = useCallback(
        (crop) => {
            onClose();

            if (!imgRef.current || !fileRef.current || !crop) return;

            const canvas = getCroppedCanvas(imgRef.current, crop, { width: minWidth, height: minHeight });
            if (!canvas) return;

            // 将 canvas 转为文件
            const { type, name, uid } = fileRef.current;
            canvas.toBlob(
                async (blob) => {
                    if (!blob) return;
                    let newFile = new File([blob], name, { type });
                    (newFile as any).uid = uid;

                    // 将原来的 beforeUpload、resolve、reject 执行
                    if (typeof beforeUploadRef.current !== 'function') return resolveRef.current(newFile);

                    const res = (beforeUploadRef.current as any)(newFile, [newFile]);

                    if (typeof res !== 'boolean' && !res) {
                        console.error('beforeUpload must return a boolean or Promise');
                        return;
                    }

                    if (res === true) return resolveRef.current(newFile);
                    if (res === false) return rejectRef.current('not upload');
                    if (res && typeof res.then === 'function') {
                        try {
                            const passedFile = await res;
                            const type = Object.prototype.toString.call(passedFile);
                            if (type === '[object File]' || type === '[object Blob]') newFile = passedFile;
                            resolveRef.current(newFile);
                        } catch (err) {
                            rejectRef.current(err);
                        }
                    }
                },
                type,
                quality
            );
        },
        [minHeight, minWidth, onClose, quality]
    );

    // 不开启裁剪
    if (!isCrop) return <>{children}</>;

    return (
        <>
            {/* 上传 */}
            {renderUpload()}
            {/* 弹窗 */}
            {imageSrc && (
                <Modal
                    bodyStyle={{
                        maxHeight: '300px',
                        overflow: 'auto',
                    }}
                    visible={true}
                    okText={modalOk}
                    title={modalTitle}
                    width={modalWidth}
                    cancelText={modalCancel}
                    onOk={() => onOk(crop)}
                    onCancel={onClose}
                    maskClosable={false}
                    destroyOnClose
                >
                    {/* 裁剪 */}
                    <div className={styles.imageCropperModal}>
                        <ReactCrop
                            aspect={aspectRatio}
                            crop={crop}
                            keepSelection
                            maxWidth={maxWidth}
                            minWidth={minWidth}
                            maxHeight={maxHeight}
                            minHeight={minHeight}
                            ruleOfThirds={grid}
                            circularCrop={circularCrop}
                            locked={Boolean(cropWidth || cropHeight)}
                            onChange={(crop) => {
                                setCrop(crop);
                            }}
                        >
                            <img ref={imgRef} src={imageSrc} alt="" onLoad={onImageLoaded} />
                        </ReactCrop>
                    </div>
                </Modal>
            )}
        </>
    );
};

ImageCropper.defaultProps = {
    modalTitle: '裁剪图片',
    modalOk: '确定',
    modalCancel: '取消',
};

export default ImageCropper;
