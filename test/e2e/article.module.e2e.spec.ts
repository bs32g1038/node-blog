import request from 'supertest';
import { ArticleModule } from '@blog/server/modules/article/article.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateDataList, isExpectPass, closeApp } from '../util';
import { clearModelCollectionData } from '../models';
import { getArticle, getObjectId } from '../faker';
import { ArticleModel } from '../models';
import queryString from 'query-string';
import { getToken } from '../util';
const __TOKEN__ = getToken();

/**
 * 文章模块 api 测试
 */
describe('article.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [ArticleModule],
        });
    });

    beforeEach(async () => {
        await clearModelCollectionData();
    });

    describe('create', () => {
        test('create article success', async () => {
            const article = getArticle();
            return request(app.getHttpServer())
                .post('/api/articles')
                .set('authorization', __TOKEN__)
                .send(article)
                .expect(201)
                .then((res) => {
                    expect(res.body).toHaveProperty('_id');
                });
        });

        test('bad request, create article failure, the category can not an empty string', async () => {
            const article1 = getArticle({ category: '' });
            return request(app.getHttpServer())
                .post('/api/articles')
                .set('authorization', __TOKEN__)
                .send(article1)
                .expect(400);
        });
    });

    describe('update', () => {
        test('update article success', async () => {
            const article = getArticle();
            const { _id } = await ArticleModel.create(article);

            return request(app.getHttpServer())
                .put('/api/articles/' + _id)
                .set('authorization', __TOKEN__)
                .send(article)
                .expect(200);
        });

        test('update article new category id success & the articleCount should be updated in category', async () => {
            const article = getArticle();
            const { _id } = await ArticleModel.create(article);

            const newCategory = getObjectId();
            return request(app.getHttpServer())
                .put('/api/articles/' + _id)
                .set('authorization', __TOKEN__)
                .send({ ...article, category: newCategory })
                .expect(200);
        });

        test('bad request, update the article data & the data not found in db', async () => {
            const article = getArticle();
            return request(app.getHttpServer())
                .put('/api/articles/' + getObjectId())
                .set('authorization', __TOKEN__)
                .send(article)
                .expect(400);
        });

        test('bad request, update the article data & the data not found in db', async () => {
            const article = getArticle();
            return request(app.getHttpServer())
                .put('/api/articles/' + getObjectId())
                .set('authorization', __TOKEN__)
                .send(article)
                .expect(400);
        });
    });

    describe('batch delete', () => {
        test('bad request, batch delete the data failure, the articleIds should be an objectId array', async () => {
            return request(app.getHttpServer())
                .delete('/api/articles')
                .set('authorization', __TOKEN__)
                .send({
                    articleIds: [],
                })
                .expect(400);
        });

        test('not found, batch delete the data failure, the articleIds data should be found in db', async () => {
            const testId = getObjectId();
            return request(app.getHttpServer())
                .delete('/api/articles')
                .set('authorization', __TOKEN__)
                .send({
                    articleIds: [testId],
                })
                .expect(404);
        });

        test('batch delete the data success', async () => {
            const article = getArticle();
            const { _id } = await ArticleModel.create(article);

            return request(app.getHttpServer())
                .delete('/api/articles')
                .set('authorization', __TOKEN__)
                .send({
                    articleIds: [_id],
                })
                .expect(200);
        });
    });

    describe('delete one', () => {
        test('delete the article success', async () => {
            const article = getArticle();
            const { _id } = await ArticleModel.create(article);
            return request(app.getHttpServer())
                .delete('/api/articles/' + _id)
                .set('authorization', __TOKEN__)
                .expect(200);
        });

        test('not found, delete failure, the article id not found in db', async () => {
            return request(app.getHttpServer())
                .delete('/api/articles/' + getObjectId())
                .set('authorization', __TOKEN__)
                .expect(404);
        });
    });

    describe('get recent articles', () => {
        test('success', async () => {
            const articles = generateDataList(() => getArticle(), 10);
            await ArticleModel.create(articles);

            return request(app.getHttpServer())
                .get('/api/recentArticles')
                .expect(200)
                .then((res) => {
                    expect(res.body.length).toBeGreaterThanOrEqual(5);
                });
        });
    });

    describe('get articles aggregation by date', () => {
        test('success', async () => {
            const articles = generateDataList(() => getArticle(), 10);
            await ArticleModel.create(articles);

            return request(app.getHttpServer())
                .get('/api/articles-aggregation/date')
                .expect(200)
                .then((res) => {
                    expect(res.body.length).toBeGreaterThanOrEqual(1);
                });
        });
    });

    describe('get one article', () => {
        test('get article success, the content is a common string', async () => {
            const article = getArticle();
            const { _id } = await ArticleModel.create(article);

            return request(app.getHttpServer())
                .get('/api/articles/' + _id + '?md=false')
                .expect(200)
                .then((res) => {
                    const a = res.body;
                    expect(a.content).toEqual(article.content);
                });
        });
    });

    describe('get article list', () => {
        test('set pagination', async () => {
            const articles = generateDataList(() => getArticle(), 10);
            await ArticleModel.create(articles);

            return request(app.getHttpServer())
                .get(`/api/articles?${queryString.stringify({ page: 1, limit: 10 })}`)
                .expect(200)
                .then((res) => {
                    expect(res.body.totalCount).toBeGreaterThanOrEqual(10);
                    expect(isExpectPass(res.body.items, articles, ['content', 'category'])).toEqual(true);
                });
        });

        test('filter the data by tag field', async () => {
            const articles = generateDataList(() => getArticle(), 10);
            await ArticleModel.create(articles);
            return request(app.getHttpServer())
                .get(`/api/articles?tag=${articles[0].tags[0]}`)
                .expect(200)
                .then((res) => {
                    expect(res.body.totalCount).toBeGreaterThanOrEqual(1);
                    expect(isExpectPass(res.body.items, articles, ['content', 'category'])).toEqual(true);
                });
        });

        test('filter the data by category field', async () => {
            const articles = generateDataList(() => getArticle(), 10);
            await ArticleModel.create(articles);

            return request(app.getHttpServer())
                .get(`/api/articles?cid=${articles[0].category}`)
                .expect(200)
                .then((res) => {
                    expect(res.body.totalCount).toBeGreaterThanOrEqual(1);
                    expect(isExpectPass(res.body.items, articles, ['content', 'category'])).toEqual(true);
                });
        });

        test('filter the data by title field', async () => {
            const articles = generateDataList(() => getArticle(), 10);
            await ArticleModel.create(articles);
            const title = articles[0].title.slice(0, 10);

            return request(app.getHttpServer())
                .get(`/api/articles?title=${title}`)
                .expect(200)
                .then((res) => {
                    expect(res.body.totalCount).toBeGreaterThanOrEqual(1);
                    expect(isExpectPass(res.body.items, articles, ['content', 'category'])).toEqual(true);
                });
        });
    });

    afterAll(async () => {
        await closeApp(app);
    });
});
