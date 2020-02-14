import request from 'supertest';
import { CategoryModule } from '../../../server/modules/category.module';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { CategoryModel } from '../../models';
import { TIP_UNAUTHORIZED_PUT } from '../../constant';
import { getCategory } from '../../faker';

const TEST = {
    url: '/api/categories/:id',
    method: 'put',
};

const getURL = id => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('category_006_e2e', () => {
    let app: INestApplication;
    const category = getCategory();

    beforeAll(async () => {
        app = await initApp({
            imports: [CategoryModule, LoginModule],
        });
        await CategoryModel.create(category);
    });

    it(template({ status: 403, params: { ':/id': category._id }, message: TIP_UNAUTHORIZED_PUT }), async () => {
        return request(app.getHttpServer())
            .put(getURL(category._id))
            .send(category)
            .expect(403);
    });

    it(template({ status: 200, params: { ':/id': category._id } }), async () => {
        return request(app.getHttpServer())
            .put(getURL(category._id))
            .set('authorization', __TOKEN__)
            .send(category)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(category._id);
                expect(a.articleCount).toEqual(category.articleCount);
                expect(a.order).toEqual(category.order);
                expect(a.name).toEqual(category.name);
            });
    });

    it(template({ status: 200, params: { ':/id': category._id }, body: { ...category, order: 11 } }), async () => {
        return request(app.getHttpServer())
            .put(getURL(category._id))
            .set('authorization', __TOKEN__)
            .send({ ...category, order: 11 })
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(category._id);
                expect(a.articleCount).toEqual(category.articleCount);
                expect(a.order).toEqual(11);
                expect(a.name).toEqual(category.name);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
