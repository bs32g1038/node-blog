"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const redis = require("redis");
const logger_1 = require("./logger");
var client = redis.createClient(config_1.default.redis.port, config_1.default.redis.host, {});
if (config_1.default.redis.password) {
    client.auth(config_1.default.redis.password);
}
client.on('error', function (err) {
    if (err) {
        logger_1.default.error('connect to %s error: ', err.message);
        process.exit(1);
    }
});
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
};
exports.hincrby = hincrby;
/**
 * 设置缓存
 * @param key 缓存key
 * @param value 缓存value
 * @param expired 缓存有效时长
 * @param callback 回调函数
 */
const set = function (key, value, expired, callback) {
    if (typeof expired === 'function') {
        callback = expired;
        expired = null;
    }
    value = JSON.stringify(value);
    if (!expired) {
        client.set(key, value, callback);
    }
    else {
        client.setex(key, expired, value, callback);
    }
};
exports.set = set;
/**
 * 获取缓存
 * @param key 缓存key
 * @param callback 回调函数
 */
const get = function (key, callback) {
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
exports.get = get;
/**
 * 移除缓存
 * @param key 缓存key
 * @param callback 回调函数
 */
const remove = function (key, callback) {
    client.del(key, callback);
};
exports.remove = remove;
const ttl = function (key, callback) {
    client.ttl(key, callback);
};
exports.default = client;
