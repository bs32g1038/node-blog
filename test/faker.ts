import mongoose from 'mongoose';
import faker from 'faker';

faker.locale = 'zh_CN';

export const getObjectId = () => {
    return new mongoose.Types.ObjectId().toString();
};

export const getCategory = () => {
    return {
        _id: getObjectId(),
        name: faker.name.findName(),
    };
};

export const getArticle = (obj = {}) => {
    return {
        _id: getObjectId(),
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
        _id: getObjectId(),
        nickName: faker.name.findName(),
        email: 'bs32g1038@163.com',
        article: null,
        reply: null,
        content: faker.lorem.paragraph(),
        ...obj,
    };
};

export const getFile = (obj = {}) => {
    return {
        _id: getObjectId(),
        name: faker.lorem.word() + '.jpg',
        url: faker.image.imageUrl(),
        size: 2000,
        type: 'image',
        ...obj,
    };
};

export default faker;
