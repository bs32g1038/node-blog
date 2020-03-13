import fs from 'fs';
import util from 'util';
import mongoose from 'mongoose';
import { isDevMode, APP_SERVER } from '@blog/server/configs/index.config';
import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { ConfigModel } from '@blog/server/models/config.model';
import siteInfo from '@blog/server/configs/site.default.config';
import { isEmpty, isEqual } from 'lodash';
import { publicPath } from '@blog/server/utils/path.util';
import { Setting } from '@blog/server/models/config.model';
import LRU from 'lru-cache';

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

    constructor(private configService: ConfigService) {
        this.namespace = namespace;
        this.setConfig(configService.get(this.namespace));
    }

    setConfig(data) {
        cache.set(this.namespace, data);
    }

    updateAppConfig = async data => {
        if (data.demoGit && !isEqual(data.demoGit, this.appConfig.demoGit)) {
            await util.promisify(fs.rename)(publicPath + '/demo', publicPath + '/' + mongoose.Types.ObjectId());
        }
        await ConfigModel.updateOne({ key: CONFIG_KEY }, data, { runValidators: true });
        const res = await ConfigModel.findOne({ key: CONFIG_KEY });
        this.setConfig(res.toObject());
        return config;
    };

    /**
     * 当处于开发环境，不使用域名
     * 采用缺省协议入库，即用 // 替代 http(s)://
     */
    get siteDomain(): string {
        if (isDevMode) {
            return '//' + APP_SERVER.hostname + ':' + APP_SERVER.port;
        }
        return '//' + this.appConfig.siteDomain;
    }

    get appConfig(): Setting {
        return cache.get(this.namespace) as any;
    }
}
