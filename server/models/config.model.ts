import mongoose from 'mongoose';
import { getProviderByModel } from '../utils/model.util';
import { configType } from '@blog/server/configs/site.default.config';

export type Setting = configType;

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
        // base64 或者 url
        siteLogo: {
            type: String,
            maxlength: 1024 * 100,
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

        /**
         * 邮箱通知服务配置
         */
        isEnableSmtp: {
            type: Boolean,
            default: false,
        },
        smtpHost: {
            type: String,
            maxlength: 100,
            trim: true,
        },
        smtpSecure: {
            type: Boolean,
            default: true,
        },
        smtpPort: {
            type: Number,
        },
        smtpAuthUser: {
            type: String,
            maxlength: 100,
            trim: true,
        },
        smtpAuthpass: {
            type: String,
            maxlength: 100,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const ConfigModel = mongoose.model('config', ConfigSchema, 'config');

export const ConfigModelProvider = getProviderByModel(ConfigModel);
