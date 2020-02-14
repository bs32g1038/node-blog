import request from 'supertest';
import { CommentModule } from '../../../server/modules/comment.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { CommentModel, ArticleModel } from '../../models';
import { getComment, getArticle } from '../../faker';
import { TIP_UNAUTHORIZED_DELETE } from '../../constant';

/**
 * 评论 删除单个条目 api 测试
 */
const TEST = {
    url: '/api/comments/:id',
    method: 'delete',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '' }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message });
};

describe('comment_003_e2e', () => {
    let app: INestApplication;
    const article = getArticle();
    const comment = getComment({ article: article._id });

    beforeAll(async () => {
        app = await initApp({ imports: [CommentModule] });
        await ArticleModel.create(article);
        await CommentModel.create(comment);
    });

    it(template({ status: 403, params: { id: comment._id }, message: TIP_UNAUTHORIZED_DELETE }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(comment._id))
            .expect(403);
    });

    it(template({ status: 200, params: { id: comment._id } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(comment._id))
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});
