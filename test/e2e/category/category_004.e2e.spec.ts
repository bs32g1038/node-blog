import request from 'supertest';
import { CategoryModule } from '../../../server/modules/category.module';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { CategoryModel } from '../../models';
import { getCategory } from '../../faker';

const TEST = {
    url: '/api/categories/:id',
    method: 'get',
};

const getURL = id => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params });
};

describe('category_004_e2e', () => {
    let app: INestApplication;
    const category = getCategory();

    beforeAll(async () => {
        app = await initApp({
            imports: [CategoryModule, LoginModule],
        });
        await CategoryModel.create(category);
    });

    it(template({ status: 200, params: { ':/id': category._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(category._id))
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(category._id);
                expect(a.order).toEqual(category.order);
                expect(a.name).toEqual(category.name);
                expect(a.articleCount).toEqual(category.articleCount);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
