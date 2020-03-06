import { isEmpty } from 'lodash';
import Joi from '@blog/server/joi';
import { Module, Global, Put } from '@nestjs/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '@blog/server/guards/roles.guard';
import { ConfigModel, Setting } from '@blog/server/models/config.model';
import { JoiBody } from '@blog/server/decorators/joi.decorator';
import { Roles } from '@blog/server/decorators/roles.decorator';
import siteInfo from '@blog/data/site.config';

import LRU from 'lru-cache';
const cache = new LRU();

const SITE_CONFIG = Symbol('SITE_CONFIG');

const config = {
    ...siteInfo,
};

const CACHE_KEY = Symbol.for('app-config-cache-key');
const CONFIG_KEY = 'app-config';

export const updateConfig = async data => {
    await ConfigModel.updateOne({ key: CONFIG_KEY }, data, { runValidators: true });
    const res = await ConfigModel.findOne({ key: CONFIG_KEY });
    cache.set(CACHE_KEY, res.toObject());
    return config;
};

export const getConfig = (): Setting => {
    return cache.get(CACHE_KEY) as any;
};

const siteConfig = {
    provide: SITE_CONFIG,
    useFactory: () => {
        return ConfigModel.findOne({ key: CONFIG_KEY }).then(res => {
            if (isEmpty(res)) {
                return ConfigModel.create({
                    key: CONFIG_KEY,
                    ...config,
                }).then(data => {
                    cache.set(CACHE_KEY, data.toObject());
                });
            }
            cache.set(CACHE_KEY, res.toObject());
        });
    },
};

@Controller('/api/configs')
@UseGuards(RolesGuard)
export class ConfigController {
    @Put()
    @Roles('admin')
    async updateConfig(
        @JoiBody({
            siteTitle: Joi.string(),
            siteLogo: Joi.string(),
            siteMetaKeyWords: Joi.string(),
            siteMetaDescription: Joi.string(),
            siteIcp: Joi.string(),
            siteDomain: Joi.string(),
            demoGit: Joi.string(),
        })
        body
    ) {
        return await updateConfig(body);
    }

    @Get()
    async getConfig() {
        return await getConfig();
    }
}

@Global()
@Module({
    controllers: [ConfigController],
    providers: [siteConfig],
})
export class SiteConfigModule {}
