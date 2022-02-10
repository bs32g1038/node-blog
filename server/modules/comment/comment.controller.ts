import { Controller, Get, Post, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comment.service';
import { Comment, CommentJoiSchema } from '../../models/comment.model';
import { Roles } from '../../decorators/roles.decorator';
import { JoiQuery, JoiParam, JoiBody } from '../../decorators/joi.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { auth } from '../../utils/auth.util';
import { ADMIN_USER_INFO } from '../../configs/index.config';
import { ObjectIdSchema, generateObjectIdSchema, StandardPaginationSchema, generateObjectIdsSchema } from '../../joi';
import { omit } from 'lodash';

@Controller('/api')
@UseGuards(RolesGuard)
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post('/comments')
    async create(@Req() req: Request, @JoiBody(CommentJoiSchema, { method: 'post' }) comment: Comment) {
        const data = await this.commentService.create(comment);
        return omit(data.toJSON(), 'email');
    }

    /**
     * 管理员回复评论接口，需要登录授权
     */
    @Post('/admin/reply-comment')
    @Roles('admin')
    async adminReplyComment(
        @Req() req: Request,
        @JoiBody(
            {
                article: CommentJoiSchema.article,
                parentId: CommentJoiSchema.parentId[1].required(),
                reply: CommentJoiSchema.reply[1],
                content: CommentJoiSchema.content,
            },
            { method: 'post' }
        )
        comment: Comment
    ) {
        Object.assign(comment, {
            identity: 1,
            nickName: ADMIN_USER_INFO.nickName,
            email: ADMIN_USER_INFO.email,
            location: ADMIN_USER_INFO.location,
        });
        const data = await this.commentService.create(comment);
        return data;
    }

    @Put('/comments/:id')
    @Roles('admin')
    async update(@JoiParam(ObjectIdSchema) params: { id: string }, @JoiBody(CommentJoiSchema) comment: Comment) {
        return await this.commentService.update(params.id, comment);
    }

    @Get('/admin-comments')
    @Roles('admin')
    async getAdminComments(
        @Req() req: Request,
        @JoiQuery({ ...StandardPaginationSchema, ...generateObjectIdSchema('articleId') })
        query: {
            page: number;
            limit: number;
            articleId: string;
        }
    ) {
        let field = '';
        if (!auth(req)) {
            field = '-email';
        }
        const { items, totalCount } = await this.commentService.getAdminCommentList({
            ...query,
            field,
        });
        return {
            items,
            totalCount,
        };
    }

    @Get('/comments')
    async getComments(
        @Req() req: Request,
        @JoiQuery({ ...StandardPaginationSchema, ...generateObjectIdSchema('articleId') })
        query: {
            page: number;
            limit: number;
            articleId: string;
        }
    ) {
        let field = '';
        if (!auth(req)) {
            field = '-email';
        }
        const { items, totalCount } = await this.commentService.getCommentList({
            ...query,
            field,
        });
        return {
            items,
            totalCount,
        };
    }

    @Get('/comments/:id')
    @Roles('admin')
    async getComment(@JoiParam(ObjectIdSchema) params: { id: string }): Promise<Comment | null> {
        return await this.commentService.getComment(params.id);
    }

    @Delete('/comments/:id')
    @Roles('admin')
    async deleteComment(@JoiParam(ObjectIdSchema) params: { id: string }) {
        return await this.commentService.deleteComment(params.id);
    }

    @Get('/recent-comments')
    @Roles('admin')
    async recentComments() {
        return await this.commentService.recentComments();
    }

    @Delete('/comments')
    @Roles('admin')
    deleteComments(@JoiBody(generateObjectIdsSchema('commentIds')) body: { commentIds: string[] }): Promise<any> {
        return this.commentService.batchDelete(body.commentIds);
    }
}
