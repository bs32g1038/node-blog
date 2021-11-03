import * as jsxss from 'xss';

const Xss = new jsxss.FilterXSS({
    whiteList: {
        ...jsxss.whiteList,
        img: ['class', 'src', 'alt', 'style'],
    },
    css: {
        whiteList: {
            'vertical-align': /^bottom$/,
            display: /^inline-block$/,
            width: true,
            height: true,
        },
    },
    onIgnoreTagAttr: (tag, name, value) => {
        // 让 prettyprint 可以工作
        if (tag === 'pre' && name === 'class') {
            return name + '="' + jsxss.escapeAttrValue(value) + '"';
        }
        return '';
    },
});

const xss = (html) => {
    return Xss.process(html);
};

export { xss };
