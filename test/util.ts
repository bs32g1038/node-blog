import mongoose from 'mongoose';
import { isEqual } from 'lodash';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from '../server/configs/index.config';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { Test } from '@nestjs/testing';
import { AllExceptionsFilter } from '../server/filters/all-exceptions.filter';
import { DynamicConfigModule } from '@blog/server/modules/dynamic-config/dynamic.config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Article, ArticleSchema } from '@blog/server/models/article.model';
import { Category, CategorySchema } from '@blog/server/models/category.model';
import { Comment, CommentSchema } from '@blog/server/models/comment.model';
import { User, UserSchema } from '@blog/server/models/user.model';
import { LoginLog, LoginLogSchema } from '@blog/server/models/loginlog.model';
import { File, FileSchema } from '@blog/server/models/file.model';
import { Draft, DraftSchema } from '@blog/server/models/draft.model';
import { getDerivedKey } from '@blog/server/utils/crypto.util';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userAgentMiddleware from '@blog/server/middlewares/user-agent.middleware';
import { TestModule } from '@blog/server/modules/test/test.module';
import { faker } from '@faker-js/faker';

export const verifyToken = (str: string) => {
    return jwt.verify(str, TOKEN_SECRET_KEY);
};

export const createModels = async ({
    isMemory = true,
    connection = null,
}: {
    isMemory?: boolean;
    connection?: any;
}) => {
    const mongoServer: MongoMemoryServer = await MongoMemoryServer.create();
    const mongooseConnection = isMemory
        ? await mongoose.createConnection(mongoServer?.getUri?.() ?? '', {}).asPromise()
        : connection || mongoose;
    const articleModel = mongooseConnection.model(Article.name, ArticleSchema, Article.name.toLocaleLowerCase());
    const categoryModel = mongooseConnection.model(Category.name, CategorySchema, Category.name.toLocaleLowerCase());
    const commentModel = mongooseConnection.model(Comment.name, CommentSchema, Comment.name.toLocaleLowerCase());
    const userModel = mongooseConnection.model(User.name, UserSchema, User.name.toLocaleLowerCase());
    const adminLogModel = mongooseConnection.model(LoginLog.name, LoginLogSchema, LoginLog.name.toLocaleLowerCase());
    const fileModel = mongooseConnection.model(File.name, FileSchema, File.name.toLocaleLowerCase());
    const draftModel = mongooseConnection.model(Draft.name, DraftSchema, Draft.name.toLocaleLowerCase());
    return {
        mongod: mongoServer,
        mongooseConnection,
        articleModel,
        categoryModel,
        commentModel,
        userModel,
        adminLogModel,
        fileModel,
        draftModel,
    };
};

export const initApp = async (metadata: ModuleMetadata) => {
    const model = await createModels({ isMemory: true });
    const testingModule = await Test.createTestingModule({
        imports: [
            MongooseModule.forRoot(model?.mongod?.getUri() ?? ''),
            DynamicConfigModule,
            TestModule,
            ...(metadata.imports || []),
        ],
        providers: metadata.providers ?? [],
    }).compile();
    const app = await testingModule.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());
    app.use(userAgentMiddleware());
    app.use(cookieParser());
    app.use(
        session({
            secret: 'my-secret',
            resave: false,
            saveUninitialized: false,
        })
    );
    await app.init();
    const user = await model.userModel.create({
        account: faker.phone.number(),
        email: faker.internet.email(),
        password: getDerivedKey('admin'),
        type: 'admin',
    });
    return {
        app,
        ...model,
        getToken: () => {
            const res = jwt.sign({ id: user._id, roles: [user.type] }, TOKEN_SECRET_KEY, {
                expiresIn: '7d',
            });
            return [`mstoken=${res}`];
        },
        user,
    };
};

export const isExpectPass = (arr1: any[], arr2: any[], skipFields: string[] = []) => {
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
    const arr: any[] = [];
    for (let i = 0; i < len; i++) {
        arr.push(fn());
    }
    return arr;
};
