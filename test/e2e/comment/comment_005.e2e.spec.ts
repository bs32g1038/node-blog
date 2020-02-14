import request from 'supertest';
import { CommentModule } from '../../../server/modules/comment.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { CommentModel, ArticleModel } from '../../models';
import { getComment, getObjectId, getArticle } from '../../faker';

/**
 * 评论 获取单个条目 api 测试
 */
const TEST = {
    url: '/api/comments/:id',
    method: 'get',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params });
};

describe('comment_005_e2e', () => {
    let app: INestApplication;
    const article = getArticle();
    const comment = getComment({ article: article._id });

    beforeAll(async () => {
        app = await initApp({ imports: [CommentModule] });
        await ArticleModel.create(article);
        await CommentModel.create(comment);
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
    it(template({ status: 200, params: { id: comment._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(comment._id))
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(comment._id);
                expect(a.identity).toEqual(0);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
