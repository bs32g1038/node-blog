import request from 'supertest';
import { ArticleModule } from '../../../server/modules/article.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateUrl, formatJestItNameE2e, isExpectPass } from '../../util';
import { ArticleModel, Article } from '../../models';
import { getArticle } from '../../faker';

/**
 * 文章 获取多个条目 api 测试
 */
const TEST = {
    url: '/api/articles',
    method: 'get',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('article_004_e2e', () => {
    let app: INestApplication;
    const articles: Article[] = [];
    for (let i = 0; i < 50; i++) {
        articles.push(getArticle());
    }

    beforeAll(async () => {
        app = await initApp({
            imports: [ArticleModule],
        });
        await ArticleModel.create(articles);
    });

    it(template({ status: 200, params: { page: 1, limit: 30 } }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ page: 1, limit: 30 }))
            .expect(200)
            .then(res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(30);
                expect(isExpectPass(res.body.items, articles, ['_id', 'title'])).toEqual(true);
            });
    });

    it(template({ status: 200, params: { tag: 'test' }, message: '标签过滤' }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ tag: articles[0].tags[0] }))
            .expect(200)
            .then(res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(1);
                expect(isExpectPass(res.body.items, articles, ['_id', 'title'])).toEqual(true);
            });
    });

    it(template({ status: 200, params: { cid: articles[0].category }, message: '分类过滤' }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ cid: articles[0].category }))
            .expect(200)
            .then(res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(1);
                expect(isExpectPass(res.body.items, articles, ['_id', 'title'])).toEqual(true);
            });
    });

    it(template({ status: 200, params: { title: articles[0].title }, message: '标题过滤' }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ title: articles[0].title }))
            .expect(200)
            .then(res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(1);
                expect(isExpectPass(res.body.items, articles, ['_id', 'title'])).toEqual(true);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
