import MarkdownIt from 'markdown-it';
import iterator from 'markdown-it-for-inline';
import jsxss from 'xss';
import { siteInfo } from '../configs/default.config';

const markdown = new MarkdownIt();

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
                return `<img src="${siteInfo.webDomain}/static/images/emotion/${name}.png" />`;
            }
        }
        return str;
    });
});

const Xss = new jsxss.FilterXSS({
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

export const render = mdStr => {
    return xss(markdown.render(mdStr));
};
