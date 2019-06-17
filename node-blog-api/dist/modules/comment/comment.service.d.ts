import { Model } from 'mongoose';
import { Comment } from '../../models/comment.model';
import { Article } from '../../models/article.model';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
export declare class CommentService {
    private readonly commentModel;
    private readonly articleModel;
    constructor(commentModel: Model<Comment>, articleModel: Model<Article>);
    create(createCategoryDto: CreateCommentDto): Promise<any>;
    update(id: string, data: UpdateCommentDto): Promise<Comment>;
    getComments(query: {}, option: {
        skip?: number;
        limit?: number;
        sort?: object;
    }): Promise<Comment[]>;
    getComment(id: string): Promise<any>;
    deleteComment(id: string): Promise<any>;
    count(query: any): Promise<any>;
}
