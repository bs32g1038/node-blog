/**
 * 加密工具类api
 */
import crypto from 'crypto-js';

export const md5 = (str: string | Buffer) => {
    const isBuffer = Buffer.isBuffer(str);
    if (isBuffer) {
        str = str.toString('binary');
    }
    return crypto.MD5(str as string).toString(crypto.enc.Hex);
};

/**
 * 进行 SHA1 加密
 * @param {String} value 原值
 * @return {String} SHA1 值
 */
export const sha1 = (value: string) => {
    return crypto.SHA1(value).toString(crypto.enc.Hex);
};

export const encrypt = (str: string) => {
    const m = crypto.MD5(str);
    const s = m.toString(crypto.enc.Hex);
    const s1 = s.slice(0, s.length / 2);
    const s2 = s.slice(s.length / 2, s.length);
    const encrypted = crypto.AES.encrypt(str, s);
    return s1 + encrypted.toString() + s2;
};

export const decrypt = (str: string) => {
    const s1 = str.slice(0, 16);
    const s2 = str.slice(str.length - 16, str.length);
    const key = str.slice(16, str.length - 16);
    return crypto.AES.decrypt(key, s1 + s2).toString(crypto.enc.Utf8);
};

export const getDerivedKey = (str: string) => {
    return crypto
        .PBKDF2(str, 'salt', {
            keySize: 32,
        })
        .toString(crypto.enc.Hex);
};
