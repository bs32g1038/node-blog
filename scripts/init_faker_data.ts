import { MONGODB } from '../server/configs/index.config';
import mongoose from 'mongoose';
import { getCategory, getArticle, getComment, getDemo, getMedia, getFile } from '../test/faker';
import { CategoryModel, ArticleModel, CommentModel, DemoModel, MediaModel, FileModel } from '../test/models';

const init = async () => {
    const conn = await mongoose.connect(MONGODB.uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    await conn.connection.dropDatabase();

    /**
     * 创建分类数据
     */
    const categories = [];
    for (let i = 0; i < 10; i++) {
        categories.push(getCategory());
    }
    await CategoryModel.create(categories);

    /**
     * 创建文章数据
     */
    const articles = [];
    for (let i = 0; i < 50; i++) {
        articles.push(getArticle({ category: categories[0]._id }));
    }
    await ArticleModel.create(articles);

    /**
     * 创建评论数据
     */
    const comments = [];
    for (let i = 0; i < 50; i++) {
        comments.push(
            getComment({
                article: articles[0]._id,
            })
        );
    }
    await CommentModel.create(comments);

    /**
     * 创建 demo 数据
     */
    const demos = [];
    for (let i = 0; i < 50; i++) {
        demos.push(getDemo());
    }
    await DemoModel.create(demos);

    /**
     * 创建 媒体 数据
     */
    const medias = [];
    for (let i = 0; i < 50; i++) {
        medias.push(getMedia());
    }
    await MediaModel.create(medias);

    /**
     * 创建 静态文件 数据
     */
    const files = [];
    for (let i = 0; i < 50; i++) {
        files.push(getFile());
    }
    await FileModel.create(files);

    console.log('生成虚拟数据完成。。。');

    process.exit(0);
};

init();
