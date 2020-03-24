import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { Comment, ICommentModel, CommentModel } from '../../models/comment.model';
import { IArticleModel, ArticleModel } from '../../models/article.model';
import { BadRequestException } from '@nestjs/common';
import { QueryRules } from '../../utils/mongoose.query.util';
import { isEmpty } from 'lodash';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(CommentModel) private readonly commentModel: ICommentModel,
        @InjectModel(ArticleModel) private readonly articleModel: IArticleModel
    ) {}

    async create(newComment: Comment) {
        const article = await this.articleModel.findById(newComment.article);
        if (isEmpty(article)) {
            throw new BadRequestException('[article]文章id为错误数据');
        }
        const comment = await this.commentModel.create(newComment);
        await this.articleModel.updateOne({ _id: article._id }, { $inc: { commentCount: 1 } });
        return comment;
    }

    async update(id: string, data: Comment) {
        await this.commentModel.updateOne({ _id: id }, data, { runValidators: true });
        return await this.commentModel.findById(id);
    }

    async getCommentList(options: {
        articleId?: string;
        page?: number;
        limit?: number;
        sort?: object;
        field?: string;
    }): Promise<{ items: Comment[]; totalCount: number }> {
        const { articleId, page = 1, limit = 10, sort = { createdAt: -1 }, field = '' } = options;
        const q = new QueryRules({ articleId }, { articleId: (id: string) => ({ article: id }) }).generateQuery();
        return await this.commentModel.paginate(q, field, {
            page,
            limit,
            sort,
            populate: [
                { path: 'article', select: 'title' },
                { path: 'reply', select: field },
            ],
        });
    }

    async getComment(id: string) {
        const comment = await this.commentModel.findById(id).populate('article', 'title');
        return comment;
    }

    async deleteComment(id: string) {
        await this.commentModel.deleteOne({ _id: id });
        return {};
    }

    async recentComments() {
        return await this.commentModel
            .find({}, '', { limit: 10, sort: { createdAt: -1 } })
            .populate('article', 'title');
    }

    async batchDelete(commentIds: string[]) {
        return this.commentModel.find({ _id: { $in: commentIds } }).then(async (comments) => {
            if (comments.length <= 0) {
                throw new NotFoundException('没有可删除的评论');
            }
            return this.commentModel.deleteMany({ _id: { $in: commentIds } });
        });
    }
}
