import { Controller, Get, Post, Body, Query, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { StandardPaginationSchema } from '../../validations/standard.pagination.validation';
import { CommentService } from './comment.service';
import { Comment } from '../../models/comment.model';
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { auth } from '../../utils/auth.util';
import { ADMIN_USER_INFO } from '../../configs/index.config';
import * as Joi from '@hapi/joi';

@Controller('/api')
@UseGuards(RolesGuard)
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    static idSchema = {
        id: Joi.string()
            .default('')
            .max(50),
    };

    static articleIdSchema = {
        articleId: Joi.string()
            .default('')
            .max(50),
    };

    @Post('/comments')
    async create(@Req() req, @Body() createCommentDto: CreateCommentDto) {
        if (auth(req)) {
            Object.assign(createCommentDto, {
                identity: 1,
                nickName: ADMIN_USER_INFO.nickName,
                email: ADMIN_USER_INFO.email,
                location: ADMIN_USER_INFO.location,
            });
        }
        return await this.commentService.create(createCommentDto);
    }

    @Put('/comments/:id')
    @Roles('admin')
    async update(@Param() params: { id: string }, @Body() categoryDto: UpdateCommentDto) {
        return await this.commentService.update(params.id, categoryDto);
    }

    @Get('/comments')
    @JoiValidationPipe(StandardPaginationSchema)
    @JoiValidationPipe(CommentController.articleIdSchema)
    async getComments(@Req() req, @Query() query: { page: number; limit: number; articleId: string }) {
        let field = '';
        const q: { article?: string } = {};
        if (query.articleId) {
            q.article = query.articleId;
        }
        /* istanbul ignore next */
        if (!auth(req)) {
            field = '-email';
        }
        const items = await this.commentService.getComments(q, {
            field,
            skip: Number(query.page),
            limit: Number(query.limit),
        });
        const totalCount = await this.commentService.count(q);
        return {
            items,
            totalCount,
        };
    }

    @Get('/comments/:id')
    @JoiValidationPipe(CommentController.idSchema)
    async getComment(@Param() params: { id: string }): Promise<Comment> {
        return await this.commentService.getComment(params.id);
    }

    @Delete('/comments/:id')
    @Roles('admin')
    @JoiValidationPipe(CommentController.idSchema)
    async deleteComment(@Param() params: { id: string }) {
        return await this.commentService.deleteComment(params.id);
    }
}
