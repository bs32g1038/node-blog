import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import toIco from 'to-ico';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DynamicConfig, DynamicConfigDocument } from '@blog/server/models/dynamic.config.model';
import { isEmpty, isEqual } from 'lodash';
import siteInfo from '@blog/server/configs/site.default.config';
import logger from '@blog/server/utils/logger.util';
import { isDevMode } from '@blog/server/configs/index.config';
import { staticAssetsPath, publicPath } from '@blog/server/utils/path.util';

export const CONFIG_KEY = 'app-config';

const config = {
    ...siteInfo,
};

@Injectable()
export class DynamicConfigService {
    _config: DynamicConfig = new DynamicConfig();
    isHasfavicon = true;
    constructor(@InjectModel(DynamicConfig.name) private readonly configModel: Model<DynamicConfigDocument>) {
        configModel.findOne({ key: CONFIG_KEY }).then(async (res) => {
            if (isEmpty(res)) {
                const data = await configModel.create({
                    key: CONFIG_KEY,
                    ...config,
                });
                logger.info('初始化配置成功！');
                return this.setConfig(data.toObject());
            }
            return this.setConfig(res.toObject());
        });
    }

    get config(): DynamicConfig {
        return this._config;
    }

    setConfig(data) {
        this._config = data;
        return this._config;
    }

    setIsHasfavicon(bool: boolean) {
        this.isHasfavicon = bool;
    }

    async updateConfig(data) {
        if (!isEmpty(data.siteLogo)) {
            const siteLogo = await this.handleSiteLogoUrl(data);
            Object.assign(data, {
                siteLogo,
            });
        }
        await this.configModel.updateOne({ key: CONFIG_KEY }, data, { runValidators: true });
        const res = await this.configModel.findOne({ key: CONFIG_KEY });
        this.setConfig(res.toObject());
        return this.config;
    }

    /**
     * 当处于开发环境，不使用域名
     * 当线上环境采用缺省协议入库，即用 // 替代 http(s)://
     */
    get siteDomain(): string {
        if (isDevMode) {
            return '';
        }
        return '//' + this.config.siteDomain;
    }

    async handleSiteLogoUrl(data) {
        // 重新映射路径
        const oldPath = path.normalize(data.siteLogo.replace(this.siteDomain, publicPath));
        const copyAimPath = path.normalize(staticAssetsPath + '/logo.svg');
        if (isEqual(oldPath, copyAimPath)) {
            // 新旧路径一样则直接返回
            return data.siteLogo;
        }
        await fs.copy(oldPath, copyAimPath);
        const content = await fs.readFile(oldPath);
        try {
            await this.generateIco(content);
        } catch (error) {
            logger.error('生成 favicon 异常', error);
        }
        return this.siteDomain + '/static/logo.svg';
    }

    async generateIco(content: Buffer) {
        return new Promise((resolve, reject) => {
            const pngPath = path.normalize(staticAssetsPath + '/favicon.png');
            const icoPath = path.normalize(staticAssetsPath + '/favicon.ico');
            sharp(content)
                .resize(64, 64)
                .png()
                .toFile(pngPath, async (err) => {
                    if (err) {
                        reject(new Error('生成favicon.png文件出错'));
                    }
                    try {
                        toIco(await fs.readFile(pngPath)).then(async (buf) => {
                            await fs.writeFile(icoPath, buf);
                            this.setIsHasfavicon(true);
                        });
                    } catch (err) {
                        reject(new Error('生成favicon.ico文件出错'));
                    }
                    resolve(true);
                });
        });
    }
}
