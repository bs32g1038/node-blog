import request from 'supertest';
import { CommentModule } from '../../../server/modules/comment.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateUrl, formatJestItNameE2e } from '../../util';
import { getObjectId, getComment, getArticle } from '../../faker';
import { TIP_UNAUTHORIZED_DELETE } from '../../constant';
import { CommentModel, ArticleModel } from '../../models';

/**
 * 评论 批量删除条目 api 测试
 */
const TEST = {
    url: '/api/comments',
    method: 'delete',
};

const getURL = () => {
    return generateUrl({ url: TEST.url });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('comment_004_e2e', () => {
    let app: INestApplication;
    const article = getArticle();
    const comment = getComment({ article: article._id });

    beforeAll(async () => {
        app = await initApp({
            imports: [CommentModule],
        });
        await ArticleModel.create(article);
        await CommentModel.create(comment);
    });

    it(template({ status: 403, message: TIP_UNAUTHORIZED_DELETE }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .expect(403);
    });

    it(template({ status: 400, params: { commentIds: '' } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                commentIds: '',
            })
            .expect(400);
    });

    it(template({ status: 400, params: { commentIds: [] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                commentIds: [],
            })
            .expect(400);
    });

    const testId = getObjectId();
    it(template({ status: 200, params: { commentIds: [testId] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                commentIds: [testId],
            })
            .expect(200);
    });

    it(template({ status: 200, params: { commentIds: [comment._id] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                commentIds: [comment._id],
            })
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
