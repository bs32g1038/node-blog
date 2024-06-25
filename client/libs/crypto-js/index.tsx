import { AES, enc, MD5 } from 'crypto-js';

export const md5 = (str: string) => {
    return MD5(str).toString();
};

export const encrypt = (str: string) => {
    const md5 = MD5(str);
    const s = md5.toString(enc.Hex);
    const s1 = s.slice(0, s.length / 2);
    const s2 = s.slice(s.length / 2, s.length);
    const encrypted = AES.encrypt(str, s);
    return s1 + encrypted.toString() + s2;
};
