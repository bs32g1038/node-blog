import request from 'supertest';
import { CategoryModule } from '../../../server/modules/category.module';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { CategoryModel } from '../../models';
import { Category } from '@blog/server/models/category.model';
import { getCategory } from '../../faker';

const TEST = {
    url: '/api/categories',
    method: 'get',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200, params = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params });
};

const handle = (res, categories = []) => {
    for (let i = 0; i < res.body.length; i++) {
        const rs = categories.some(item => {
            return item._id === res.body[i]._id && item.name === res.body[i].name;
        });
        if (rs) {
            return rs;
        }
    }
};

describe('category_003_e2e', () => {
    let app: INestApplication;
    const categories: Category[] = [];
    for (let i = 0; i < 50; i++) {
        categories.push(getCategory());
    }

    beforeAll(async () => {
        app = await initApp({
            imports: [CategoryModule, LoginModule],
        });
        await CategoryModel.create(categories);
    });

    it(template({ status: 200, params: {} }), async () => {
        return request(app.getHttpServer())
            .get(TEST.url)
            .expect(200)
            .then(res => {
                expect(res.body.length).toBeGreaterThanOrEqual(categories.length);
                expect(handle(res, categories)).toEqual(true);
            });
    });

    it(template({ status: 200, params: { page: 1, limit: 20 } }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ page: 1, limit: 20 }))
            .expect(200)
            .then(res => {
                expect(res.body.length).toEqual(20);
                expect(handle(res, categories)).toEqual(true);
            });
    });

    it(template({ status: 200, params: { page: 1, limit: 20 } }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ page: 2, limit: 20 }))
            .expect(200)
            .then(res => {
                expect(res.body.length).toEqual(20);
                expect(handle(res, categories)).toEqual(true);
            });
    });

    it(template({ status: 400, params: { page: 1, limit: 10000 } }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ page: 1, limit: 10000 }))
            .expect(400);
    });

    afterAll(async () => {
        await app.close();
    });
});
