import * as jsxss from 'xss';

const Xss = new jsxss.FilterXSS({
    onIgnoreTagAttr: (tag: string, name: string, value: string) => {
        // 让 prettyprint 可以工作
        if (tag === 'pre' && name === 'class') {
            return name + '="' + jsxss.escapeAttrValue(value) + '"';
        }
        return '';
    },
});

export const xss = (html: string) => {
    return Xss.process(html);
};

export const isServer = typeof window === 'undefined';
