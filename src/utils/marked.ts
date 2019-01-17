import marked from 'marked';
const renderer = new marked.Renderer();
const rP = renderer.paragraph;
renderer.paragraph = (text: any, level: any) => {
    text = rP(text);
    const regex = /@\((.+?)\)/g;
    return text.replace(regex, (str: any) => {
        if (str) {
            const r = /\((.+?)\)/g.exec(str);
            if (r) {
                const name = r[1];
                return `<img src="/public/images/emotion/${name}.png" />`;
            }
        }
        return str;
    });
};

renderer.link = () => {
    return '';
};

export default (str: any) => {
    return marked(str, { renderer });
};