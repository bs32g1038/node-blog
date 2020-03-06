import MD5 from 'crypto-js/md5';

export const md5 = (str: string) => {
    return MD5(str).toString();
};
