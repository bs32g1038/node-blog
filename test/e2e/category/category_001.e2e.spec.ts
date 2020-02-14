import request from 'supertest';
import { CategoryModule } from '../../../server/modules/category.module';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { getCategory } from '../../faker';
import { TIP_UNAUTHORIZED_POST } from '../../constant';

const TEST = {
    url: '/api/categories',
    method: 'post',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('category_001_e2e', () => {
    let app: INestApplication;
    const category = getCategory();

    beforeAll(async () => {
        app = await initApp({
            imports: [CategoryModule, LoginModule],
        });
    });

    it(template({ status: 403, body: category, message: TIP_UNAUTHORIZED_POST }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .send(category)
            .expect(403);
    });

    it(template({ status: 201, body: category }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .set('authorization', __TOKEN__)
            .send(category)
            .expect(201)
            .then(res => {
                expect(res.body._id).toEqual(category._id);
                expect(res.body.name).toEqual(category.name);
                expect(res.body.order).toEqual(category.order);
                expect(res.body.articleCount).toEqual(category.articleCount);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
