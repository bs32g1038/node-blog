import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../../models/comment.model';
import { Article } from '../../models/article.model';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel('comment') private readonly commentModel: Model<Comment>,
        @InjectModel('article') private readonly articleModel: Model<Article>
    ) { }

    async create(commentDto: CreateCommentDto) {
        const article = await this.articleModel.findById(commentDto.article);
        if (!article) {
            throw new BadRequestException('[article]文章id为错误数据');
        }
        const comment: Comment = await this.commentModel.create(commentDto);
        await this.articleModel.updateOne({ _id: article._id }, { $inc: { commentCount: 1 } });
        return comment;
    }

    async update(id: string, data: UpdateCommentDto) {
        await this.commentModel.updateOne({ _id: id }, data);
        return await this.commentModel.findById(id);
    }

    async getComments(
        query: {} = {},
        option: { skip?: number, limit?: number, sort?: object, field?: string }
    ): Promise<Comment[]> {
        const { skip = 1, limit = 10, sort = { createdAt: -1 }, field = '' } = option;
        const filter = { ...query };
        return await this.commentModel.find(filter, field, {
            skip,
            limit,
            sort
        }).populate('article', 'title').populate('reply', field);
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

}
