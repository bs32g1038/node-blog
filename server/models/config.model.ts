import mongoose from 'mongoose';
import { getProviderByModel } from '../utils/model.util';

const demoConfig = new mongoose.Schema({
    git: {
        type: String,
        minlength: 1,
        maxlength: 200,
    },
    time: {
        type: Date,
    },
});

const ConfigSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            unique: true,
        },
        // dmeo 相关配置
        demo: demoConfig,
    },
    {
        timestamps: true,
    }
);

export const ConfigModel = mongoose.model('config', ConfigSchema, 'config');

export const ConfigModelProvider = getProviderByModel(ConfigModel);
