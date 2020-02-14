import request from 'supertest';
import { CategoryModule } from '../../../server/modules/category.module';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { getCategory, getObjectId } from '../../faker';
import { CategoryModel } from '../../models';

const TEST = {
    url: '/api/categories',
    method: 'delete',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200, params = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: getURL(), status, params });
};

describe('category_002_e2e', () => {
    let app: INestApplication;
    const category = getCategory();

    beforeAll(async () => {
        app = await initApp({
            imports: [CategoryModule, LoginModule],
        });
        await CategoryModel.create(category);
    });

    it(template({ status: 400, params: { categoryIds: '' } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                categoryIds: '',
            })
            .expect(400);
    });

    it(template({ status: 400, params: { categoryIds: [] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                categoryIds: [],
            })
            .expect(400);
    });

    const testId = getObjectId();
    it(template({ status: 200, params: { categoryIds: [testId] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                categoryIds: [testId],
            })
            .expect(200);
    });

    it(template({ status: 200, params: { categoryIds: [category._id] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                categoryIds: [category._id],
            })
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
