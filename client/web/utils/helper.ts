import { css } from '@emotion/core';
import jsxss from 'xss';
import aes from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import md5 from 'crypto-js/md5';
import GHAT from '../../libs/generate-avatar';

const ghat = new GHAT();

const sizes = {
    desktop: 992,
    tablet: 768,
    phone: 576,
};

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc: any, label) => {
    acc[label] = (...args: any) => css`
        @media (max-width: ${sizes[label] / 16}em) {
            ${css(...args)}
        }
    `;
    return acc;
}, {});

const Xss = new jsxss.FilterXSS({
    onIgnoreTagAttr: (tag: any, name: any, value: any) => {
        // 让 prettyprint 可以工作
        if (tag === 'pre' && name === 'class') {
            return name + '="' + jsxss.escapeAttrValue(value) + '"';
        }
        return '';
    },
});

export const xss = (html: any) => {
    return Xss.process(html);
};

export const isServer = typeof window === 'undefined';

export const aesDecrypt = (str: string, key: string) => aes.decrypt(str, key).toString(encUtf8);
export const aesEncrypt = (str: string, key: string) => aes.encrypt(str, key).toString();

export const gernateAvatarImage = (str: string) => {
    return ghat.getImage(md5(str).toString());
};
