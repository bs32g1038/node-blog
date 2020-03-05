import { ArticleModel } from '../server/models/article.model';
import { CategoryModel } from '../server/models/category.model';
import { CommentModel } from '../server/models/comment.model';
import { DemoModel } from '../server/models/demo.model';
import { FileModel } from '../server/models/file.model';
import { AdminLogModel } from '../server/models/adminlog.model';
import { UserModel } from '../server/models/user.model';

export { ArticleModel, CategoryModel, CommentModel, AdminLogModel, FileModel, DemoModel, UserModel };

export const clearModelCollectionData = async () => {
    return Promise.all([
        ArticleModel.deleteMany({}),
        CategoryModel.deleteMany({}),
        CommentModel.deleteMany({}),
        AdminLogModel.deleteMany({}),
        FileModel.deleteMany({}),
        DemoModel.deleteMany({}),
        UserModel.deleteMany({}),
    ]);
};
