import request from 'supertest';
import { ArticleModule } from '../../../server/modules/article.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { ArticleModel } from '../../models';
import { getArticle, getObjectId } from '../../faker';
import { TIP_UNAUTHORIZED_DELETE } from '../../constant';

/**
 * 文章 删除单个条目 api 测试
 */
const TEST = {
    url: '/api/articles/:id',
    method: 'delete',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '' }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message });
};

describe('article_007_e2e', () => {
    let app: INestApplication;
    const article = getArticle();

    beforeAll(async () => {
        app = await initApp({ imports: [ArticleModule] });
        await ArticleModel.create(article);
    });

    it(template({ status: 403, params: { id: article._id }, message: TIP_UNAUTHORIZED_DELETE }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(article._id))
            .expect(403);
    });

    it(template({ status: 200, params: { id: article._id } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(article._id))
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    /**
     * 文章不存在，测试用例
     */
    const testId = getObjectId();
    it(template({ status: 200, params: { id: testId } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(testId))
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});
