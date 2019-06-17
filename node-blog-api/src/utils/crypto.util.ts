/**
 * 加密工具类api
 */
import * as crypto from 'crypto';

export const md5 = (str: string) => {
    const _md5 = crypto.createHash('md5');
    _md5.update(str, 'utf8');
    return _md5.digest('hex');
};

/**
 * 进行 SHA1 加密
 * @param {String} value 原值
 * @return {String} SHA1 值
 */
export const sha1 = (value: string) => {
    const _sha1 = crypto.createHash('sha1');
    _sha1.update(value);
    return _sha1.digest('hex');
};
