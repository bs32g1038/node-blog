/* eslint-disable */
const path = require('path');
const pathToRegexp = require('path-to-regexp');
const fs = require('fs');

/**
 * 处理.next文件夹中的css链接，避免css样式影响到blog的样式问题
 */
async function init() {
    console.log('正在处理css链接问题。。。');
    const file = await fs.existsSync(path.resolve(__dirname, '../.next/build-manifest.json'));
    if (file) {
        const data = require('../.next/build-manifest.json');
        const keys = ['/_app', '/blog', '/about', '/blog/article', '/blog/articles', '/_error'];
        const newData = { ...data };
        keys.map(key => {
            newData.pages[key] = newData.pages[key].filter(value => {
                return !pathToRegexp('static/css/commons.:id.chunk.css').test(value);
            });
        });
        await fs.writeFileSync(path.resolve(__dirname, '../.next/build-manifest.json'), JSON.stringify(newData));
    }
    console.log('处理css链接问题结束！');
}

init();
