import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment, ICommentModel } from '../../models/comment.model';
import { Article, IArticelModel } from '../../models/article.model';
import { BadRequestException } from '@nestjs/common';
import { QueryRules } from '../../utils/mongoose.query.util';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { IUserModel, User } from '@blog/server/models/user.model';
import { CreateCommentDto } from './comment.zod.schema';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private readonly commentModel: ICommentModel,
        @InjectModel(Article.name) private readonly articleModel: IArticelModel,
        @InjectModel(User.name) private readonly userModel: IUserModel
    ) {}

    async create(newComment: CreateCommentDto) {
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
        const res = await this.commentModel.paginate(q, {
            page,
            limit,
            sort,
            populate: [
                { path: 'article', select: 'title' },
                { path: 'reply', select: field },
            ],
            select: field,
        });
        return {
            items: res.docs,
            totalCount: res.totalDocs,
        };
    }

    async getCommentList(options: {
        userId?: string;
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
        const data = await this.commentModel.paginate(q, {
            page,
            limit,
            sort,
            populate: [
                { path: 'article', select: 'title _id' },
                { path: 'user', select: 'username avatar' },
                { path: 'reply' },
            ],
            select: field,
        });
        const _ds = await Promise.all(
            data.docs.map(async (item) => {
                const { sort = { createdAt: 1 }, field = '' } = options;
                const comments = await this.commentModel.find(
                    {
                        parentId: item._id,
                        article: articleId,
                    },
                    field,
                    {
                        sort,
                        populate: [
                            { path: 'user', select: 'username avatar' },
                            { path: 'reply', populate: [{ path: 'user', select: 'username avatar' }] },
                        ],
                    }
                );
                return {
                    ...item.toJSON(),
                    isCanDeleted: item.user._id.toString() === options.userId,
                    comments: comments.map((com) => {
                        return {
                            ...com.toJSON(),
                            isCanDeleted: com.user._id.toString() === options.userId,
                        };
                    }),
                };
            })
        );
        return {
            items: _ds,
            totalCount: data.totalDocs,
        };
    }

    async getComment(id: string) {
        const comment = await this.commentModel
            .findById(id)
            .populate('article', 'title')
            .populate('user', 'username avatar');
        return comment;
    }

    async deleteComment(id: string, userId: string) {
        if (userId) {
            const user = await this.userModel.findById(userId);
            if (user?.type === 'admin') {
                const comment = await this.commentModel.findById(id);
                if (comment) {
                    await this.commentModel.deleteOne({ _id: id });
                    await this.articleModel.updateOne({ _id: comment.article }, { $inc: { commentCount: -1 } });
                }
                return;
            }
        }
        const comment = await this.commentModel.findOne({
            _id: id,
            user: userId,
        });
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

    async likeComment(commentId: string, userId: string) {
        const res = await this.commentModel.findById(commentId);
        if (res?.likes?.includes(userId)) {
            res.likes = res.likes.filter((item) => item.toString() !== userId);
            await res.save();
        } else if (res) {
            res?.likes?.push(userId);
            await res.save();
        }
        return res;
    }
}
