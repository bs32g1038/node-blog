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
// const hincrby = function (key, field, value, expired, callback) {
//     client.exists(key, function (err, res) {
//         if (err) {
//             return callback(err)
//         }
//         client.hincrby(key, field, value, function (err, num) {
//             if (res == 0 && expired) {
//                 client.expire(key, expired);
//             }
//             callback(null, num);
//         });
//     });
// }
const set = function (key, value) {
    return new Promise(function (resolve, reject) {
        value = JSON.stringify(value);
        client.set(key, value, function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};
exports.set = set;
const setx = function (key, value, expired) {
    return new Promise(function (resolve, reject) {
        client.setex(key, expired, value, function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};
exports.setx = setx;
const get = function (key) {
    return new Promise(function (resolve, reject) {
        client.get(key, function (err, data) {
            if (err) {
                return reject(err);
            }
            resolve(data ? JSON.parse(data) : '');
        });
    });
};
exports.get = get;
const remove = function (key) {
    return new Promise(function (resolve, reject) {
        client.del(key, function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};
exports.remove = remove;
exports.default = client;
