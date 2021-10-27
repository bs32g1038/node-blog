import { MONGODB } from '../server/configs/index.config';
import mongoose from 'mongoose';
import { ArticleModel, CommentModel } from '../test/models';

const init = async () => {
    const conn = await mongoose.connect(MONGODB.uri);

    const articles = await ArticleModel.find({});

    await Promise.all(
        articles.map(async (item) => {
            const count = await CommentModel.countDocuments({ article: item._id });
            await ArticleModel.updateOne({ _id: item._id }, { commentCount: count });
        })
    );

    console.log('修复数据完成。。。');

    conn.connection.close();

    process.exit(0);
};

init();
