import request from 'supertest';
import { ArticleModule } from '../../../server/modules/article.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { getArticle } from '../../faker';
import { TIP_UNAUTHORIZED_POST } from '../../constant';

/**
 * 文章 创建条目 api 测试
 */
const TEST = {
    url: '/api/articles',
    method: 'post',
};

const getURL = () => {
    return generateUrl({ url: TEST.url });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('article_001_e2e', () => {
    let app: INestApplication;
    const article = getArticle();
    const article1 = getArticle({ category: null });

    beforeAll(async () => {
        app = await initApp({
            imports: [ArticleModule],
        });
    });

    it(template({ status: 403, body: article, message: TIP_UNAUTHORIZED_POST }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .send(article)
            .expect(403);
    });

    it(template({ status: 201, body: article }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .set('authorization', __TOKEN__)
            .send(article)
            .expect(201);
    });

    /**
     * 当category字段为null时，测试用例
     */
    it(template({ status: 400, body: article1 }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .set('authorization', __TOKEN__)
            .send(article1)
            .expect(400);
    });

    afterAll(async () => {
        await app.close();
    });
});
