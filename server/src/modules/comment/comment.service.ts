import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { Comment, CommentDocument, CommentModel } from '../../models/comment.model';
import { ArticleDocument, ArticleModel } from '../../models/article.model';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(CommentModel) private readonly commentModel: Model<CommentDocument>,
        @InjectModel(ArticleModel) private readonly articleModel: Model<ArticleDocument>
    ) {}

    async create(newComment: Comment) {
        const article = await this.articleModel.findById(newComment.article);
        if (!article) {
            throw new BadRequestException('[article]文章id为错误数据');
        }
        const comment: Comment = await this.commentModel.create(newComment);
        await this.articleModel.updateOne({ _id: article._id }, { $inc: { commentCount: 1 } });
        return comment;
    }

    async update(id: string, data: Comment) {
        await this.commentModel.updateOne({ _id: id }, data);
        return await this.commentModel.findById(id);
    }

    async getComments(
        query: {} = {},
        option: { skip?: number; limit?: number; sort?: object; field?: string }
    ): Promise<Comment[]> {
        const { skip = 1, limit = 10, sort = { createdAt: -1 }, field = '' } = option;
        const filter = { ...query };
        return await this.commentModel
            .find(filter, field, {
                skip: (skip - 1) * limit,
                limit,
                sort,
            })
            .populate('article', 'title')
            .populate('reply', field);
    }

    async getComment(id: string) {
        const comment = await this.commentModel.findById(id).populate('article', 'title');
        return comment;
    }

    async deleteComment(id: string) {
        await this.commentModel.deleteOne({ _id: id });
        return {};
    }

    async count(query) {
        const filter = { ...query };
        return await this.commentModel.countDocuments(filter);
    }

    async recentComments() {
        return this.getComments({}, { limit: 10 });
    }
} /* istanbul ignore next */
