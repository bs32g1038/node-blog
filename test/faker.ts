import mongoose from 'mongoose';
import faker from 'faker';

faker.locale = 'zh_CN';

export const getObjectId = () => {
    return mongoose.Types.ObjectId().toString();
};

export const getCategory = () => {
    const at = new Date().toISOString();
    return {
        _id: mongoose.Types.ObjectId().toString(),
        articleCount: faker.random.number() % 10000,
        order: faker.random.number() % 200,
        name: faker.name.findName(),
        createdAt: at,
        updatedAt: at,
    };
};

export const getDemo = (content = '') => {
    const at = new Date().toISOString();
    return {
        _id: mongoose.Types.ObjectId().toString(),
        title: faker.name.title(),
        content: content || '```html\ntest\n```\n```css\ntest\n```\n```javascript\ntest\n```',
        visitCount: faker.random.number() % 10000,
        createdAt: at,
        updatedAt: at,
        __v: 0,
    };
};

export const getArticle = (obj = {}) => {
    const at = new Date().toISOString();
    const categories = [getCategory(), getCategory(), getCategory(), getCategory()];
    return {
        _id: mongoose.Types.ObjectId().toString(),
        title: faker.name.title(),
        content: faker.lorem.text(),
        summary: faker.lorem.paragraph(),
        screenshot: faker.image.imageUrl(),
        category: categories[Math.floor(Math.random() * categories.length)]._id.toString(),
        tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        createdAt: at,
        updatedAt: at,
        __v: 0,
        ...obj,
    };
};

export const getComment = (obj = {}) => {
    const at = new Date().toISOString();
    return {
        _id: mongoose.Types.ObjectId().toString(),
        nickName: faker.name.findName(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        article: null,
        reply: null,
        location: faker.address.streetAddress(),
        content: faker.lorem.text(),
        identity: Math.floor(Math.random()),
        createdAt: at,
        updatedAt: at,
        __v: 0,
        ...obj,
    };
};

export const getMedia = (obj = {}) => {
    const at = new Date().toISOString();
    return {
        _id: mongoose.Types.ObjectId().toString(),
        originalName: 'test.png',
        name: 'test',
        mimetype: 'image/type',
        size: 2000,
        suffix: '.png',
        fileName: 'test.png',
        filePath: '/upload/2019/test.png',
        type: 'image',
        createdAt: at,
        updatedAt: at,
        __v: 0,
        ...obj,
    };
};

export const getFile = (obj = {}) => {
    const at = new Date().toISOString();
    return {
        _id: mongoose.Types.ObjectId().toString(),
        originalName: 'test.png',
        name: 'test',
        mimetype: 'image/type',
        size: 2000,
        suffix: '.png',
        fileName: 'test.png',
        filePath: '/upload/2019/test.png',
        isdir: false,
        category: 0,
        parentId: null,
        fileCount: 0,
        createdAt: at,
        updatedAt: at,
        __v: 0,
        ...obj,
    };
};

export default faker;
