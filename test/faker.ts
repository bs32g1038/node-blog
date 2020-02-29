import mongoose from 'mongoose';
import faker from 'faker';

faker.locale = 'zh_CN';

export const getObjectId = () => {
    return mongoose.Types.ObjectId().toString();
};

export const getCategory = () => {
    return {
        name: faker.name.findName(),
    };
};

export const getDemo = (content = '') => {
    return {
        title: faker.name.title(),
        content: content || '```html\ntest\n```\n```css\ntest\n```\n```javascript\ntest\n```',
    };
};

export const getArticle = (obj = {}) => {
    return {
        title: faker.name.title(),
        content: faker.lorem.paragraphs(),
        summary: faker.lorem.paragraph(),
        screenshot: faker.image.imageUrl(),
        category: getObjectId(),
        tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        ...obj,
    };
};

export const getComment = (obj = {}) => {
    return {
        nickName: faker.name.findName(),
        email: 'bs32g1038@163.com',
        article: null,
        reply: null,
        content: faker.lorem.paragraph(),
        ...obj,
    };
};

export const getMedia = (obj = {}) => {
    return {
        originalName: 'test.png',
        name: 'test',
        mimetype: 'image/type',
        size: 2000,
        suffix: '.png',
        fileName: 'test.png',
        filePath: '/upload/2019/test.png',
        type: 'image',
        ...obj,
    };
};

export const getFile = (obj = {}) => {
    return {
        originalName: 'test.png',
        name: 'test',
        mimetype: 'image/type',
        size: 2000,
        suffix: '.png',
        fileName: 'test.png',
        filePath: '/upload/2019/test.png',
        isdir: false,
        category: 1,
        parentId: null,
        ...obj,
    };
};

export default faker;
