import { MONGODB } from '../server/configs/index.config';
import mongoose from 'mongoose';
import { getArticle, getComment, getFile, getObjectId } from '../test/faker';
import { CategoryModel, ArticleModel, CommentModel, FileModel } from '../test/models';

const init = async () => {
    const conn = await mongoose.connect(MONGODB.uri);
    await conn.connection.dropDatabase();

    /**
     * 创建分类数据
     */
    const categories: any[] = [];
    const categoryNames = ['frontend', 'backend', 'share', 'others'];
    for (let i = 0; i < 4; i++) {
        categories.push({ name: categoryNames[i], _id: getObjectId(), articleCount: i === 0 ? 15 : 0 });
    }
    await CategoryModel.create(categories);

    /**
     * 创建文章数据
     */
    const articles: any[] = [];
    for (let i = 0; i < 15; i++) {
        articles.push({ ...getArticle({ category: categories[0]._id }), _id: getObjectId() });
    }
    await ArticleModel.create(articles);

    /**
     * 创建评论数据
     */
    const comments: any[] = [];
    for (let i = 0; i < 15; i++) {
        comments.push({
            ...getComment({
                article: articles[0]._id,
            }),
            _id: getObjectId(),
        });
    }
    await CommentModel.create(comments);

    /**
     * 创建 静态文件 数据
     */
    const files: any[] = [];
    for (let i = 0; i < 15; i++) {
        files.push(getFile());
    }
    await FileModel.create(files);

    console.log('生成虚拟数据完成。。。');

    process.exit(0);
};

init();
