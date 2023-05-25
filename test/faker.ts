import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

export const getObjectId = () => {
    return new mongoose.Types.ObjectId().toString();
};

export const getCategory = () => {
    return {
        name: faker.person.fullName(),
    };
};

export const getExplore = () => {
    return {
        contetn: faker.lorem.paragraphs(),
    };
};

export const getArticle = (obj = {}) => {
    return {
        title: faker.lorem.sentence(7),
        content: faker.lorem.paragraphs(),
        screenshot: faker.image.url(),
        category: getObjectId(),
        tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        ...obj,
    };
};

export const getComment = (obj = {}) => {
    return {
        nickName: faker.person.fullName(),
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
        originName: faker.lorem.word() + '.jpg',
        url: faker.image.url(),
        size: 2000,
        type: 'image',
        ...obj,
    };
};

export default faker;
