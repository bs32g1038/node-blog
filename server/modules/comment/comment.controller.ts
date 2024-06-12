import { Controller, Get, Post, Delete, UseGuards, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Roles } from '../../decorators/roles.decorator';
import { ZodQuery, ZodParam, ZodBody } from '../../decorators/zod.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { omit } from 'lodash';
import { CreateCommentDto, createCommentZodSchema } from './comment.zod.schema';
import { objectIdSchema, standardPaginationSchema } from '@blog/server/zod/common.schema';
import { z } from 'zod';
@Controller('/api')
@UseGuards(RolesGuard)
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post('/comments')
    @Roles('user', 'admin')
    async create(@Req() req: any, @ZodBody(createCommentZodSchema) comment: CreateCommentDto) {
        const ua = req.useragent;
        comment.ip = req.ip;
        comment.user = req.user.id;
        comment.browser = `${ua.browser.name} ${ua.browser.version}`;
        comment.os = `${ua.os.name} ${ua.os.version}`;
        const data = await this.commentService.create(comment);
        return omit(data.toJSON(), 'email');
    }

    @Get('/comments')
    @Roles('all')
    async getComments(
        @Req() req: any,
        @ZodQuery(
            standardPaginationSchema.merge(
                z
                    .object({
                        articleId: z.string(),
                    })
                    .partial()
            )
        )
        query: {
            page: number;
            limit: number;
            articleId: string;
        }
    ) {
        const { items, totalCount } = await this.commentService.getCommentList({
            ...query,
            userId: req?.user?.id,
            field: '',
        });
        return {
            items,
            totalCount,
        };
    }

    @Get('/comments/:id')
    @Roles('admin')
    async getComment(@ZodParam(objectIdSchema) params: { id: string }) {
        return await this.commentService.getComment(params.id);
    }

    @Delete('/comments/:id')
    @Roles('user', 'admin')
    async deleteComment(@Req() req: any, @ZodParam(objectIdSchema) params: { id: string }) {
        return await this.commentService.deleteComment(params.id, req?.user?.id);
    }

    @Get('/recent-comments')
    @Roles('admin')
    async recentComments() {
        return await this.commentService.recentComments();
    }

    @Delete('/comments')
    @Roles('admin')
    deleteComments(@ZodBody(objectIdSchema) body: { ids: string[] }) {
        return this.commentService.batchDelete(body.ids);
    }

    @Post('/like-comment/:id')
    @Roles('user')
    likeComment(@Req() req: any, @ZodParam(objectIdSchema) params: { id: string }) {
        console.log(req.user.id);
        return this.commentService.likeComment(params.id, req.user.id);
    }
}
