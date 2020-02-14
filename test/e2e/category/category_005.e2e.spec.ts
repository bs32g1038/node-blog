import request from 'supertest';
import { CategoryModule } from '../../../server/modules/category.module';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { CategoryModel } from '../../models';
import { TIP_UNAUTHORIZED_DELETE } from '../../constant';
import { getCategory } from '../../faker';

const TEST = {
    url: '/api/categories/:id',
    method: 'delete',
};

const getURL = id => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '' }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message });
};

describe('category_005_e2e', () => {
    let app: INestApplication;
    const category = getCategory();
    beforeAll(async () => {
        app = await initApp({
            imports: [CategoryModule, LoginModule],
        });
        await CategoryModel.create(category);
    });

    it(template({ status: 403, params: { ':/id': category._id }, message: TIP_UNAUTHORIZED_DELETE }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(category._id))
            .expect(403);
    });

    it(template({ status: 200, params: { ':/id': category._id } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(category._id))
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});
