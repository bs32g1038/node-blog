import config from '../config';
import redis = require("redis");
import logger from './logger';

var client = redis.createClient(config.redis.port, config.redis.host, {});

if (config.redis.password) {
    client.auth(config.redis.password);
}

client.on('error', function (err) {
    if (err) {
        logger.error('connect to %s error: ', err.message);
        process.exit(1);
    }
})

/*****
 * 设置缓存
 * @param key   缓存key
 * @param field 缓存field
 * @param value 缓存value
 * @param expired   缓存有效时长
 * @param callback  回调函数，返回增加后的结果
 */
const hincrby = function (key, field, value, expired, callback) {
    client.exists(key, function (err, res) {
        client.hincrby(key, field, value, function (err, num) {
            if (res == 0 && expired) {
                client.expire(key, expired);
            }
            callback(null, num);
        });
    });
}

/**
 * 设置缓存
 * @param key 缓存key
 * @param value 缓存value
 * @param expired 缓存有效时长
 * @param callback 回调函数
 */
const set = function (key: string, value: string | Object, expired?: Function | number | null, callback?: Function) {
    if (typeof expired === 'function') {
        callback = expired;
        expired = null;
    }
    value = JSON.stringify(value);
    if (!expired) {
        client.set(key, value, callback);
    } else {
        client.setex(key, expired, value, callback);
    }
};


/**
 * 获取缓存
 * @param key 缓存key
 * @param callback 回调函数
 */
const get = function (key: string, callback: Function) {
    client.get(key, function (err, data) {
        if (err) {
            return callback(err);
        }
        if (!data) {
            return callback();
        }
        data = JSON.parse(data);
        callback(null, data);
    });

};

/**
 * 移除缓存
 * @param key 缓存key
 * @param callback 回调函数
 */
const remove = function (key: string, callback: Function) {
    client.del(key, callback);
};

const ttl = function (key: string, callback: Function) {
    client.ttl(key, callback);
}

export {
    hincrby,
    set,
    get,
    remove
}

export default client;