import { ArticleModel } from '@blog/server/models/article.model';
import { CategoryModel } from '@blog/server/models/category.model';
import { CommentModel } from '@blog/server/models/comment.model';
import { FileModel } from '@blog/server/models/file.model';
import { AdminLogModel } from '@blog/server/models/adminlog.model';
import { UserModel } from '@blog/server/models/user.model';

export { ArticleModel, CategoryModel, CommentModel, AdminLogModel, FileModel, UserModel };

export const clearModelCollectionData = async () => {
    return Promise.all([
        ArticleModel.deleteMany({}),
        CategoryModel.deleteMany({}),
        CommentModel.deleteMany({}),
        AdminLogModel.deleteMany({}),
        FileModel.deleteMany({}),
        UserModel.deleteMany({}),
    ]);
};
