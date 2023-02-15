import mongoose from 'mongoose';
import { isEqual } from 'lodash';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from '../server/configs/index.config';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { Test } from '@nestjs/testing';
import { AllExceptionsFilter } from '../server/filters/all-exceptions.filter';
import { DynamicConfigModule } from '@blog/server/modules/dynamic-config/dynamic.config.module';
import { EmailModule } from '@blog/server/modules/email/email.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Article, ArticleSchema } from '@blog/server/models/article.model';
import { Category, CategorySchema } from '@blog/server/models/category.model';
import { Comment, CommentSchema } from '@blog/server/models/comment.model';
import { User, UserSchema } from '@blog/server/models/user.model';
import { AdminLog, AdminLogSchema } from '@blog/server/models/adminlog.model';
import { File, FileSchema } from '@blog/server/models/file.model';

export const getToken = () => {
    return jwt.sign({ account: 'test', roles: ['admin'] }, TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60,
    });
};

export const verifyToken = (str) => {
    return jwt.verify(str, TOKEN_SECRET_KEY);
};

export const createModels = async ({
    isMemory = true,
    connection = null,
}: {
    isMemory?: boolean;
    connection?: any;
}) => {
    const mongoServer = await MongoMemoryServer.create();
    const conn = isMemory
        ? await mongoose.createConnection(mongoServer.getUri(), { dbName: 'test' })
        : connection || mongoose;
    const articleModel = conn.model(Article.name, ArticleSchema, Article.name.toLocaleLowerCase());
    const categoryModel = conn.model(Category.name, CategorySchema, Category.name.toLocaleLowerCase());
    const commentModel = conn.model(Comment.name, CommentSchema, Comment.name.toLocaleLowerCase());
    const userModel = conn.model(User.name, UserSchema, User.name.toLocaleLowerCase());
    const adminLogModel = conn.model(AdminLog.name, AdminLogSchema, AdminLog.name.toLocaleLowerCase());
    const fileModel = conn.model(File.name, FileSchema, File.name.toLocaleLowerCase());
    return {
        mongod: mongoServer,
        mongooseConnection: conn,
        articleModel,
        categoryModel,
        commentModel,
        userModel,
        adminLogModel,
        fileModel,
    };
};

export const initApp = async (metadata: ModuleMetadata) => {
    const model = await createModels({ isMemory: true });
    const testModule = await Test.createTestingModule({
        imports: [
            MongooseModule.forRoot(await model.mongod.getUri()),
            DynamicConfigModule,
            EmailModule,
            ...(metadata.imports || []),
        ],
        providers: metadata.providers ?? [],
    }).compile();
    const app = testModule.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
    return {
        app,
        ...model,
    };
};

export const isExpectPass = (arr1: unknown[], arr2: unknown[], skipFields: string[] = []) => {
    for (let i = 0; i < arr1.length; i++) {
        const rs = arr2.some((item) => {
            return Object.keys(item).every((key) => {
                // 跳过字段检查
                if (skipFields.includes(key)) {
                    return true;
                }
                return isEqual(item[key], arr1[i][key]);
            });
        });
        if (rs) {
            return rs;
        }
    }
    return false;
};

export const generateDataList = (fn: () => void, len = 0) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(fn());
    }
    return arr;
};
