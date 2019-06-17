import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { CommentService } from './comment.service';
import { Comment } from '../../models/comment.model';
import * as Joi from 'joi';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    static idSchema: {
        id: Joi.StringSchema;
    };
    create(req: any, createCommentDto: CreateCommentDto): Promise<any>;
    update(params: {
        id: string;
    }, categoryDto: UpdateCommentDto): Promise<Comment>;
    getComments(query: {
        page: number;
        limit: number;
    }): Promise<{
        items: Comment[];
        totalCount: any;
    }>;
    getComment(params: {
        id: string;
    }): Promise<Comment>;
    deleteComment(params: {
        id: string;
    }): Promise<Comment>;
}
