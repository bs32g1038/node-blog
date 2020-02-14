import { MONGODB } from '../server/configs/index.config';
import mongoose from 'mongoose';

module.exports = async () => {
    const conn = await mongoose.connect(MONGODB.uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    await conn.connection.dropDatabase();

    // /**
    //  * 创建分类数据
    //  */
    // const categories: Category[] = [];
    // for (let i = 0; i < 50; i++) {
    //     categories.push({
    //         _id: mongoose.Types.ObjectId(),
    //         name: faker.name.findName(),
    //     });
    // }
    // await CategoryModel.create(categories);

    // /**
    //  * 创建文章数据
    //  */
    // const articles: Article[] = [];
    // for (let i = 0; i < 50; i++) {
    //     articles.push({
    //         _id: mongoose.Types.ObjectId(),
    //         title: faker.name.title(),
    //         content: faker.lorem.text(),
    //         summary: faker.lorem.paragraph(),
    //         screenshot: faker.image.imageUrl(),
    //         category: categories[Math.floor(Math.random() * 50)]._id.toString(),
    //         tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    //     });
    // }
    // await ArticleModel.create(articles);

    // const comments: Comment[] = [];
    // for (let i = 0; i < 50; i++) {
    //     comments.push({
    //         _id: mongoose.Types.ObjectId().toString(),
    //         nickName: faker.name.findName(),
    //         email: faker.internet.email(),
    //         website: faker.internet.url(),
    //         article: articles[Math.floor(Math.random() * 50)]._id.toString(),
    //         reply: i > 30 ? comments[Math.floor(Math.random() * 30)]._id.toString() : null,
    //         location: faker.address.streetAddress(),
    //         content: faker.lorem.text(),
    //         identity: Math.floor(Math.random()),
    //     });
    // }
    // await CommentModel.create(comments);

    // const demos: Demo[] = [];
    // for (let i = 0; i < 50; i++) {
    //     demos.push({
    //         _id: mongoose.Types.ObjectId().toString(),
    //         title: faker.name.title(),
    //         content: faker.lorem.text(),
    //     });
    // }
    // await DemoModel.create(demos);
};
