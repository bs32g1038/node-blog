import { Inject } from '@nestjs/common';

const DB_MODEL_TOKEN_SUFFIX = 'db_model_token';

export function getModelToken(modelName: string): string {
    return modelName + DB_MODEL_TOKEN_SUFFIX;
}

// 根据 Model 获取 Provider
export const getProviderByModel = (model: { modelName: string }) => {
    return {
        provide: model.modelName + DB_MODEL_TOKEN_SUFFIX,
        useValue: model,
    };
};

// 注入器
export const InjectModel = (model: { modelName: string }) => {
    return Inject(getModelToken(model.modelName));
};
