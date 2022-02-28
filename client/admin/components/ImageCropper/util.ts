import type { Crop } from 'react-image-crop';

// 获得裁剪后的 canvas
export function getCroppedCanvas(image: HTMLImageElement, crop: Crop, resize: { width: number; height: number }) {
    const canvas = document.createElement('canvas');
    const pixelRatio = 1;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
    );

    if (resize) {
        const canvas1 = document.createElement('canvas');
        const ctx1 = canvas1.getContext('2d');
        const width = Math.min(resize.width * 2, canvas.width);
        const height = Math.min(resize.height * 2, canvas.height);
        canvas1.width = width;
        canvas1.height = height;
        ctx1.drawImage(canvas, 0, 0, width, height);
        return canvas1;
    }

    return canvas;
}
