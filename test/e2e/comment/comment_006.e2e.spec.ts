import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { CommentModel, ArticleModel } from '../../models';
import { getComment, getArticle } from '../../faker';
import { TIP_UNAUTHORIZED_PUT } from '../../constant';
import { CommentModule } from '../../../server/modules/comment.module';

/**
 * 评论 更新条目 api 测试
 */
const TEST = {
    url: '/api/comments/:id',
    method: 'put',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('comment_006_e2e', () => {
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

    it(template({ status: 403, body: comment, message: TIP_UNAUTHORIZED_PUT }), async () => {
        return request(app.getHttpServer())
            .put(getURL(comment._id))
            .send(comment)
            .expect(403);
    });

    it(template({ status: 200, body: comment }), async () => {
        return request(app.getHttpServer())
            .put(getURL(comment._id))
            .set('authorization', __TOKEN__)
            .send(comment)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(comment._id);
                expect(a.identity).toEqual(comment.identity);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
