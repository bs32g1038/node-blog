import * as cache from './cache';
import config from '../config';
 
async function init() {
    let setting = await cache.get(config.site_setting._id)
    console.log("配置信息：", setting);
}

init()