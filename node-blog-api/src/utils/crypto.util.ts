/**
 * 加密工具类api
 */
import * as crypto from 'crypto-js';

export const md5 = (str: string) => {
    return crypto.MD5(str).toString(crypto.enc.Hex);
};

/**
 * 进行 SHA1 加密
 * @param {String} value 原值
 * @return {String} SHA1 值
 */
export const sha1 = (value: string) => {
    return crypto.SHA1(value).toString(crypto.enc.Hex);
};

// 加密方法
export const decrypt = (str: string) => {
    const s1 = str.slice(0, 16);
    const s2 = str.slice(str.length - 16, str.length);
    const key = str.slice(16, str.length - 16);
    return crypto.AES.decrypt(key, s1 + s2).toString(crypto.enc.Utf8);
};

export const getDerivedKey = (str: string) => {
    return crypto.PBKDF2(str, 'salt', 1, 32, 'sha512').toString(crypto.enc.Hex);
};
