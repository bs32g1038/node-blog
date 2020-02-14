import request from 'supertest';
import { ArticleModule } from '../../../server/modules/article.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { ArticleModel } from '../../models';
import { getArticle, getObjectId } from '../../faker';
import { markdown } from '../../../server/modules/article/article.service';

/**
 * 文章 获取单个条目 api 测试
 */
const TEST = {
    url: '/api/articles/:id',
    method: 'get',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params });
};

describe('article_006_e2e', () => {
    let app: INestApplication;
    const article = getArticle();
    const article1 = getArticle({ content: '```html\ntest\n```\n```css\ntest\n```\n```javascript\ntest\n```' });
    const article2 = getArticle({ content: '```\ntest\n```' });

    beforeAll(async () => {
        app = await initApp({ imports: [ArticleModule] });
        await ArticleModel.create(article);
        await ArticleModel.create(article1);
        await ArticleModel.create(article2);
    });

    const randomId = getObjectId();
    it(template({ status: 200, params: { id: randomId } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(randomId))
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a).toEqual({});
            });
    });

    it(template({ status: 200, params: { id: article._id, md: true } }), async () => {
        return request(app.getHttpServer())
            .get(`${getURL(article._id)}md=true`)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a.content).toEqual(markdown.render(article.content));
            });
    });

    it(template({ status: 200, params: { id: article._id, md: false } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(article._id))
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a.content).toEqual(article.content);
            });
    });

    /**
     * markdown 内容带```lang content ```
     */
    it(template({ status: 200, params: { id: article1._id, md: true } }), async () => {
        return request(app.getHttpServer())
            .get(`${getURL(article1._id)}md=true`)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a.content).toEqual(markdown.render(article1.content));
            });
    });

    /**
     * markdown 内容带``` content ```
     */
    it(template({ status: 200, params: { id: article2._id, md: true } }), async () => {
        return request(app.getHttpServer())
            .get(`${getURL(article2._id)}md=true`)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a.content).toEqual(markdown.render(article2.content));
            });
    });

    afterAll(async () => {
        await app.close();
    });
});