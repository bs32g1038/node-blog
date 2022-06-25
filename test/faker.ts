import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

export const getObjectId = () => {
    return new mongoose.Types.ObjectId().toString();
};

export const getCategory = () => {
    return {
        name: faker.name.findName(),
    };
};

export const getExplore = () => {
    return {
        contetn: faker.lorem.paragraphs(),
    };
};

export const getArticle = (obj = {}) => {
    return {
        title: faker.lorem.words(),
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

export const getFile = (obj = {}) => {
    return {
        name: faker.lorem.word() + '.jpg',
        url: faker.image.imageUrl(),
        size: 2000,
        type: 'image',
        ...obj,
    };
};

export default faker;
