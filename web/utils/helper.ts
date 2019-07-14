import { css } from '@emotion/core';
import jsxss from 'xss';

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
    onIgnoreTagAttr: (tag: any, name: any, value: any, isWhiteAttr: any) => {
        // 让 prettyprint 可以工作
        if (tag === 'pre' && name === 'class') {
            return name + '="' + jsxss.escapeAttrValue(value) + '"';
        }
        return '';
    }
});

export const xss = (html: any) => {
    return Xss.process(html);
};

export const isServer = typeof window === 'undefined';