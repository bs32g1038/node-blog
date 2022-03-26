import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment, CommentDocument } from '../../models/comment.model';
import { Article, ArticleDocument } from '../../models/article.model';
import { BadRequestException } from '@nestjs/common';
import { QueryRules } from '../../utils/mongoose.query.util';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { IPaginate } from '@blog/server/mongoose/paginate';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument> & IPaginate,
        @InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>
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

    async getAdminCommentList(options: {
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

    async getCommentList(options: {
        articleId?: string;
        page?: number;
        limit?: number;
        sort?: object;
        field?: string;
    }): Promise<{ items: Comment[]; totalCount: number }> {
        const { articleId, page = 1, limit = 10, sort = { createdAt: -1 }, field = '' } = options;
        let q = {};
        if (articleId) {
            q = {
                parentId: null,
                reply: null,
                article: articleId,
            };
        }
        const data = await this.commentModel.paginate(q, field, {
            page,
            limit,
            sort,
            populate: [{ path: 'article', select: 'title' }],
        });
        const _ds = await Promise.all(
            data.items.map(async (item) => {
                const { page = 1, limit = 100, sort = { createdAt: 1 }, field = '' } = options;
                const comments = await this.commentModel.paginate(
                    {
                        parentId: item._id,
                        article: articleId,
                    },
                    field,
                    {
                        page,
                        limit,
                        sort,
                        populate: [{ path: 'reply', select: field }],
                    }
                );
                return { ...item.toJSON(), comments };
            })
        );
        return {
            items: _ds,
            totalCount: data.totalCount,
        };
    }

    async getComment(id: string) {
        const comment = await this.commentModel.findById(id).populate('article', 'title');
        return comment;
    }

    async deleteComment(id: string) {
        const comment = await this.commentModel.findById(id);
        if (comment) {
            await this.commentModel.deleteOne({ _id: id });
            await this.articleModel.updateOne({ _id: comment.article }, { $inc: { commentCount: -1 } });
        }
        return comment;
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
            await Promise.all(
                comments.map(async (item) => {
                    await this.articleModel.updateOne({ _id: item.article }, { $inc: { commentCount: -1 } });
                })
            );
            return this.commentModel.deleteMany({ _id: { $in: commentIds } });
        });
    }
}
