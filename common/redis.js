var config = require('../config');
var redis = require("redis");

var client = redis.createClient(6379, '127.0.0.1', {});

// client.auth('');


client.on('error', function (err) {
})

exports.client = client;

/*****
 * 设置缓存
 * @param key   缓存key
 * @param field 缓存field
 * @param value 缓存value
 * @param expired   缓存有效时长
 * @param callback  回调函数，返回增加后的结果
 */
exports.hincrby = function (key, field, value, expired, callback) {

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
 * @param expired 缓存的有效时长，单位秒
 * @param callback 回调函数
 */
exports.setItem = function (key, value, expired, callback) {
    client.set(key, JSON.stringify(value), function (err) {
        if (err) {
            return callback(err);
        }
        if (expired) {
            client.expire(key, expired);
        }
        return callback(null);
    });
};

/**
 * 获取缓存
 * @param key 缓存key
 * @param callback 回调函数
 */
exports.getItem = function (key, callback) {
    client.get(key, function (err, reply) {
        if (err) {
            return callback(err);
        }
        return callback(null, JSON.parse(reply));
    });
};

/**
 * 移除缓存
 * @param key 缓存key
 * @param callback 回调函数
 */
exports.removeItem = function (key, callback) {
    client.del(key, function (err) {
        if (err) {
            return callback(err);
        }
        return callback(null);
    });
};

/**
 * 获取默认过期时间，单位秒
 */
exports.defaultExpired = parseInt(config.cache_expired);