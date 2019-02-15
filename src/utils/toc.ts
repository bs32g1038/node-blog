function tocHelper(options: any = {}) {
    const headingsMaxDepth = options.hasOwnProperty('max_depth') ? options.max_depth : 3;
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].slice(0, headingsMaxDepth).join(',');
    const className = options.class || 'toc';
    const listNumber = options.hasOwnProperty('list_number') ? options.list_number : true;
    let result: any = `<ol class="${className}">`;
    const lastNumber = [0, 0, 0, 0, 0, 0];
    let firstLevel = 0;
    let lastLevel = 0;
    const $TOC: any = document.querySelector('.markdown-body');
    const arr: any = $TOC.querySelectorAll(headings);
    for (const H of arr) {
        const level = + H.tagName.charAt(1);
        const text = H.innerText;
        H.setAttribute('id', text.replace(/\s+/g, '-'));
        const id: any = text.replace(/\s+/g, '-');
        lastNumber[level - 1]++;
        for (let i = level; i <= 5; i++) {
            lastNumber[i] = 0;
        }
        if (firstLevel) {
            for (let i = level; i < lastLevel; i++) {
                result += '</li></ol>';
            }
            if (level > lastLevel) {
                result += `<ol class="${className}-child">`;
            } else {
                result += '</li>';
            }
        } else {
            firstLevel = level;
        }
        result += `<li class="${className}-item ${className}-level-${level}">`;
        result += `<a class="${className}-link" href="#${id}">`;
        if (listNumber) {
            result += `<span class="${className}-number">`;
            for (let i = firstLevel - 1; i < level; i++) {
                result += `${lastNumber[i]}.`;
            }
            result += '</span> ';
        }
        result += `<span class="${className}-text">${text}</span></a>`;
        lastLevel = level;
    }
    for (let i = firstLevel - 1; i < lastLevel; i++) {
        result += '</li></ol>';
    }
    if (result === '<ol class="toc"></li></ol>') {
        return '';
    }
    return result;
}

export default tocHelper;