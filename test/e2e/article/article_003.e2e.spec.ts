import request from 'supertest';
import { ArticleModule } from '../../../server/modules/article.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateUrl, formatJestItNameE2e } from '../../util';
import { ArticleModel } from '../../models';
import { getArticle, getObjectId } from '../../faker';
import { TIP_UNAUTHORIZED_DELETE } from '../../constant';

/**
 * 文章 批量删除条目 api 测试
 */
const TEST = {
    url: '/api/articles',
    method: 'delete',
};

const getURL = () => {
    return generateUrl({ url: TEST.url });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('article_003_e2e', () => {
    let app: INestApplication;
    const article = getArticle();

    beforeAll(async () => {
        app = await initApp({
            imports: [ArticleModule],
        });
        ArticleModel.create(article);
    });

    it(template({ status: 403, message: TIP_UNAUTHORIZED_DELETE }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .expect(403);
    });

    it(template({ status: 400, params: { articleIds: '' } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                articleIds: '',
            })
            .expect(400);
    });

    it(template({ status: 200, params: { articleIds: [] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                articleIds: [],
            })
            .expect(200);
    });

    const testId = getObjectId();
    it(template({ status: 200, params: { articleIds: [testId] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                articleIds: [testId],
            })
            .expect(200);
    });

    it(template({ status: 200, params: { articleIds: [article._id] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                articleIds: [article._id],
            })
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
