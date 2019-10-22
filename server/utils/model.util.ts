import { Model, Document } from 'mongoose';
import { Inject } from '@nestjs/common';

const DB_MODEL_TOKEN_SUFFIX = 'db_model_token';

export function getModelToken(modelName: string): string {
    return modelName + DB_MODEL_TOKEN_SUFFIX;
}

// 根据 Model 获取 Provider
export const getProviderByModel = (model: Model<Document>) => {
    return {
        provide: model.modelName + DB_MODEL_TOKEN_SUFFIX,
        useValue: model,
    };
};

// 注入器
export const InjectModel = <T extends Document>(model: Model<T>) => {
    return Inject(getModelToken(model.modelName));
};
