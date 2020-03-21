import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import { isDevMode } from '@blog/server/configs/index.config';
import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { ConfigModel } from '@blog/server/models/config.model';
import siteInfo from '@blog/server/configs/site.default.config';
import { isEmpty, isEqual } from 'lodash';
import { staticAssetsPath, publicPath } from '@blog/server/utils/path.util';
import { Setting } from '@blog/server/models/config.model';
import LRU from 'lru-cache';
import toIco from 'to-ico';

const cache = new LRU();
const namespace = 'siteConfig';
const CONFIG_KEY = 'app-config';
const config = {
    ...siteInfo,
};

export const siteConfig = registerAs(namespace, () => {
    return ConfigModel.findOne({ key: CONFIG_KEY }).then(async res => {
        if (isEmpty(res)) {
            const data = await ConfigModel.create({
                key: CONFIG_KEY,
                ...config,
            });
            return data.toObject();
        }
        return res.toObject();
    });
});

@Injectable()
export class AppConfigService {
    private readonly namespace: string;
    isHasfavicon = true;

    constructor(private configService: ConfigService) {
        this.namespace = namespace;
        this.setConfig(configService.get(this.namespace));
    }

    setConfig(data) {
        cache.set(this.namespace, data);
    }

    updateAppConfig = async data => {
        if (!isEmpty(data.siteLogo)) {
            const siteLogo = await this.handleSiteLogoUrl(data);
            Object.assign(data, {
                siteLogo,
            });
        }
        await ConfigModel.updateOne({ key: CONFIG_KEY }, data, { runValidators: true });
        const res = await ConfigModel.findOne({ key: CONFIG_KEY });
        this.setConfig(res.toObject());
        return config;
    };

    setIsHasfavicon(bool: boolean) {
        this.isHasfavicon = bool;
    }

    /**
     * 当处于开发环境，不使用域名
     * 当线上环境采用缺省协议入库，即用 // 替代 http(s)://
     */
    get siteDomain(): string {
        if (isDevMode) {
            return '';
        }
        return '//' + this.appConfig.siteDomain;
    }

    get appConfig(): Setting {
        return cache.get(this.namespace) as any;
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
        await this.generateIco(content);
        return this.siteDomain + '/static/logo.svg';
    }

    async generateIco(content: Buffer) {
        return new Promise((resolve, reject) => {
            const pngPath = path.normalize(staticAssetsPath + '/favicon.png');
            const icoPath = path.normalize(staticAssetsPath + '/favicon.ico');
            sharp(content)
                .resize(64, 64)
                .png()
                .toFile(pngPath, async err => {
                    if (err) {
                        reject(new Error('生成favicon.png文件出错'));
                    }
                    try {
                        toIco(await fs.readFile(pngPath)).then(async buf => {
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
