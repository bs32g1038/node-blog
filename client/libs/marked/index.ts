/**
 * markdown渲染器，支持解释表情图标，自动过滤脚本
 */
import MarkdownIt from 'markdown-it';
import iterator from 'markdown-it-for-inline';
import jsxss from 'xss';

const markdown = new MarkdownIt({
    breaks: true,
});

markdown.renderer.rules.text = function(tokens, idx /*, options, env */) {
    return tokens[idx].content;
};

markdown.use(iterator, 'emoji_replace', 'text', function(tokens, idx) {
    const text = tokens[idx].content;
    const regex = /@\((.+?)\)/g;
    tokens[idx].content = text.replace(regex, str => {
        if (str) {
            const r = /\((.+?)\)/g.exec(str);
            if (r) {
                const name = r[1];
                return `<img class="emoji" src="/static/images/emotion/${name}.png" style="width:28px;height:28px;vertical-align: bottom; display: inline-block;" />`;
            }
        }
        return str;
    });
});

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

const xss = html => {
    return Xss.process(html);
};

export default mdStr => {
    return xss(markdown.render(mdStr));
};
