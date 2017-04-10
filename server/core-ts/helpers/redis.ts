import { resolve4, resolve6 } from 'dns';
import { resolve } from 'url';
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

const set = function (key: string, value: string | Object) {
    return new Promise(function (resolve, reject) {
        value = JSON.stringify(value);
        client.set(key, value, function (err) {
            if (err) {
                return reject(err)
            }
            resolve();
        });
    });
};

const setx = function (key: string, value: string | Object, expired: number) {
    return new Promise(function (resolve, reject) {
        client.setex(key, expired, value, function (err) {
            if (err) {
                return reject(err)
            }
            resolve();
        });
    })
}

const get = function (key: string) {
    return new Promise(function (resolve, reject) {
        client.get(key, function (err, data) {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(data || ''));
        });
    });
};

const remove = function (key: string) {
    return new Promise(function (resolve, reject) {
        client.del(key, function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    })
};

export {
    set,
    setx,
    get,
    remove
}

export default client;