import mongoose from 'mongoose';
import { getProviderByModel } from '../utils/model.util';

const ConfigSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            unique: true,
            select: false,
        },
        // 网站相关配置
        siteTitle: {
            type: String,
            maxlength: 200,
        },
        siteLogo: {
            type: String,
            maxlength: 200,
        },
        siteMetaKeyWords: {
            type: String,
            maxlength: 2000,
        },
        siteMetaDescription: {
            type: String,
            maxlength: 2000,
        },
        siteIcp: {
            type: String,
            maxlength: 100,
        },
        // dmeo 相关配置
        demoGit: {
            type: String,
            minlength: 1,
            maxlength: 200,
        },
        demoTime: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export const ConfigModel = mongoose.model('config', ConfigSchema, 'config');

export const ConfigModelProvider = getProviderByModel(ConfigModel);
