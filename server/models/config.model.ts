import mongoose from 'mongoose';
import { getProviderByModel } from '../utils/model.util';

export interface Setting {
    siteTitle: string;
    siteLogo: string;
    siteMetaKeyWords: string;
    siteMetaDescription: string;
    siteIcp: string;
    siteDomain: string;
    demoGit: string;
}

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
            trim: true,
        },
        siteLogo: {
            type: String,
            maxlength: 200,
            trim: true,
        },
        siteMetaKeyWords: {
            type: String,
            maxlength: 2000,
            trim: true,
        },
        siteMetaDescription: {
            type: String,
            maxlength: 2000,
            trim: true,
        },
        siteIcp: {
            type: String,
            maxlength: 100,
            trim: true,
        },
        siteDomain: {
            type: String,
            maxlength: 100,
            trim: true,
        },
        // dmeo 相关配置
        demoGit: {
            type: String,
            minlength: 1,
            maxlength: 200,
            trim: true,
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
