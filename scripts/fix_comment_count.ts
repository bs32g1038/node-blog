import { MONGODB } from '../server/configs/index.config';
import mongoose from 'mongoose';
import { createModels } from '../test/util';

const init = async () => {
    const conn = await mongoose.connect(MONGODB.uri);
    const { articleModel, commentModel }: any = await createModels({ isMemory: false, connection: conn });

    const articles = await articleModel.find({});

    await Promise.all(
        articles.map(async (item) => {
            const count = await commentModel.countDocuments({ article: item._id });
            await articleModel.updateOne({ _id: item._id }, { commentCount: count });
        })
    );

    console.log('修复数据完成。。。');

    conn.connection.close();

    process.exit(0);
};

init();
