import { Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { ConfigModel } from '../../models/config.model';
import { isEmpty } from 'lodash';
import LRU from 'lru-cache';
const cache = new LRU();

const config = {
    demo: {
        git: 'https://gitee.com/chengli01/demo',
    },
};

@Injectable()
export class ConfigService {
    CACHE_KEY = Symbol.for('app-config-cache-key');
    CONFIG_KEY = 'app-config';

    constructor(@InjectModel(ConfigModel) private readonly configModel) {
        configModel.findOne({ key: this.CONFIG_KEY }).then(res => {
            if (isEmpty(res)) {
                return configModel
                    .create({
                        key: this.CONFIG_KEY,
                        ...config,
                    })
                    .then(data => {
                        cache.set(this.CACHE_KEY, data.toObject());
                    });
            }
            cache.set(this.CACHE_KEY, res.toObject());
        });
    }

    getConfig() {
        return cache.get(this.CACHE_KEY);
    }

    async updateConfig(data) {
        await this.configModel.updateOne({ key: this.CONFIG_KEY }, data, { runValidators: true });
        const res = await this.configModel.findOne({ key: this.CONFIG_KEY });
        const config = res.toObject();
        cache.set(this.CACHE_KEY, config);
        return config;
    }
}
