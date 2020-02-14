import request from 'supertest';
import { CommentModule } from '../../../server/modules/comment.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { getComment, getArticle } from '../../faker';
import { ArticleModel } from '../../models';

/**
 * 评论 创建条目 api 测试
 */
const TEST = {
    url: '/api/comments',
    method: 'post',
};

const getURL = () => {
    return generateUrl({ url: TEST.url });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};
describe('comment_001_e2e', () => {
    let app: INestApplication;
    const article = getArticle();
    const comment = getComment({ article: article._id });
    const comment1 = getComment({ article: article._id });
    const testComment1 = getComment({ article: null });

    beforeAll(async () => {
        app = await initApp({
            imports: [CommentModule],
        });
        await ArticleModel.create(article);
    });

    /**
     * 评论内容字段中的 article 为 null，测试用例
     */
    it(template({ status: 400, body: testComment1, message: '文章id不应该为空' }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .send(testComment1)
            .expect(400);
    });

    it(template({ status: 201, body: comment, message: '普通用户创建' }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .send(comment)
            .expect(201)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(comment._id);
                expect(a.identity).toEqual(0);
            });
    });

    it(template({ status: 201, body: comment1, message: '管理员创建' }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .set('authorization', __TOKEN__)
            .send(comment1)
            .expect(201)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(comment1._id);
                expect(a.identity).toEqual(1);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
