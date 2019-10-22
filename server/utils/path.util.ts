import { join } from 'path';

/**
 * 根目录路径，指向当前执行命令的目录
 */
export const getRootPath = () => {
    return process.cwd();
};

/**
 * 日志文件路径
 */
export const logPath = join(getRootPath(), 'logs');

/**
 * public目录路径
 */
export const publicPath = join(getRootPath(), 'public');

/**
 * 静态资源路径
 */
export const staticAssetsPath = join(getRootPath(), 'public/static');
/**
 * 上传文件存放目录路径
 */
export const uploadRootPath = join(publicPath, 'static/upload');

/**
 *  获取带年份的上传路径如：** /upload/2019/
 */
export const getUploadPathWithYear = () => {
    return '/static/upload/' + new Date().getFullYear();
};
