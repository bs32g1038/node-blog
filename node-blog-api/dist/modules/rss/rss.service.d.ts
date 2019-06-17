import { Article } from '../../models/article.model';
import { Model } from 'mongoose';
export declare class RssService {
    private readonly articleModel;
    constructor(articleModel: Model<Article>);
    index(): Promise<any>;
}
