import { join } from 'path';
import fs from 'fs';
import util from 'util';
import { publicPath, getUploadPathWithYear } from './path.util';
const writeFile = util.promisify(fs.writeFile);

/**
 * 创建上传文件
 * @param fileName 文件名
 * @param fileBuffer 文件buffer
 * @return 返回文件链接url
 */
export const creteUploadFile = async (fileName: string, fileBuffer: Buffer) => {
    const _uploadPath = getUploadPathWithYear();
    const basePath = join(publicPath, _uploadPath);
    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath);
    }
    await writeFile(basePath + '/' + fileName, fileBuffer);
    const url = _uploadPath + '/' + fileName;
    return url;
};
