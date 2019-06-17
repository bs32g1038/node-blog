import { Model } from 'mongoose';
import { Article } from '../../models/article.model';
import { Category } from '../../models/category.model';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';
export declare class ArticleService {
    private readonly articleModel;
    private readonly categoryModel;
    constructor(articleModel: Model<Article>, categoryModel: Model<Category>);
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    update(id: string, data: UpdateArticleDto): Promise<Article>;
    getArticles(query: {
        cid?: string;
    }, option: {
        skip?: number;
        limit?: number;
        sort?: object;
    }): Promise<Article[]>;
    getArticle(id: string): Promise<any>;
    getRandomArticles(size?: number): Promise<any>;
    deleteArticle(id: string): Promise<any>;
    count(query: any): Promise<any>;
}
