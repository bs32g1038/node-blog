import _jss from 'xss';
const jsxss: any = _jss;

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
