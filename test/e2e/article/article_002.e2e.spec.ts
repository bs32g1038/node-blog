import request from 'supertest';
import { ArticleModule } from '../../../server/modules/article.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { ArticleModel } from '../../../server/models/article.model';
import { getArticle, getObjectId } from '../../faker';
import { TIP_UNAUTHORIZED_PUT } from '../../constant';

/**
 * 文章 更新条目 api 测试
 */
const TEST = {
    url: '/api/articles/:id',
    method: 'put',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('article_002_e2e', () => {
    let app: INestApplication;
    const article = getArticle();

    beforeAll(async () => {
        app = await initApp({
            imports: [ArticleModule],
        });
        ArticleModel.create(article);
    });

    it(template({ status: 403, body: article, message: TIP_UNAUTHORIZED_PUT }), async () => {
        return request(app.getHttpServer())
            .put(getURL(article._id))
            .send(article)
            .expect(403);
    });

    it(template({ status: 400, body: article }), async () => {
        return request(app.getHttpServer())
            .put(getURL(getObjectId()))
            .set('authorization', __TOKEN__)
            .send(article)
            .expect(400);
    });

    it(template({ status: 200, body: article }), async () => {
        return request(app.getHttpServer())
            .put(getURL(article._id))
            .set('authorization', __TOKEN__)
            .send(article)
            .expect(200);
    });

    /**
     * 更新文章内容分类id
     */
    const newCategory = getObjectId();
    it(template({ status: 200, body: { ...article, category: newCategory } }), async () => {
        return request(app.getHttpServer())
            .put(getURL(article._id))
            .set('authorization', __TOKEN__)
            .send({ ...article, category: newCategory })
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
