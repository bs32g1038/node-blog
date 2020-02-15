import request from 'supertest';
import { ArticleModule } from '../../../server/modules/article.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateUrl, formatJestItNameE2e } from '../../util';
import { ArticleModel, Article } from '../../models';
import { getArticle } from '../../faker';

/**
 * 文章 获取最近条目 api 测试
 */
const TEST = {
    url: '/api/recentArticles',
    method: 'get',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('article_005_e2e', () => {
    let app: INestApplication;
    const articles: Article[] = [];
    for (let i = 0; i < 5; i++) {
        articles.push(getArticle());
    }

    beforeAll(async () => {
        app = await initApp({
            imports: [ArticleModule],
        });
        await ArticleModel.create(articles);
    });

    it(template({ status: 200 }), async () => {
        return request(app.getHttpServer())
            .get(getURL())
            .expect(200)
            .then(res => {
                expect(res.body.length).toBeGreaterThanOrEqual(5);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
