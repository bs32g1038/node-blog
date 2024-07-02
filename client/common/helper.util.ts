export const handleEmoji = (text: string) => {
    const regex = /@\((.+?)\)/g;
    return text.replace(regex, (str) => {
        if (str) {
            const r = /\((.+?)\)/g.exec(str);
            if (r) {
                const name = r[1];
                return `<img class="emoji" src="/static/images/emotion/${name}.png" style="width:28px;height:28px;display: inline-block;" />`;
            }
        }
        return str;
    });
};
