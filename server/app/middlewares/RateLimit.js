"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache = require("../helpers/cache");
var _ = require('lodash');
var SEPARATOR = '☆@☆';
function RateLimit(options) {
    var defaultOptions = {
        expired: 60 * 60 * 24,
        limitCount: 150,
        errorMsg: 'There is an exception to your IP, please try again later.',
        status: 429,
        showJson: true,
        name: 'rate-limit',
        keyGenerator: function (req) {
            var ipAddress;
            var headers = req.headers;
            var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
            forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
            if (!ipAddress) {
                ipAddress = req.connection.remoteAddress;
            }
            return ipAddress;
        }
    };
    options = _.extend(defaultOptions, options);
    const { keyGenerator, limitCount, expired, status, errorMsg, name, showJson } = options;
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var key = name + SEPARATOR + keyGenerator(req, res) + SEPARATOR + limitCount;
            try {
                let count = yield cache.get(key);
                count = count || 0;
                if (count < limitCount) {
                    count += 1;
                    cache.setx(key, count, expired);
                    res.set('X-RateLimit-Limit', limitCount);
                    res.set('X-RateLimit-Remaining', limitCount - count);
                    next();
                }
                else {
                    res.status(status);
                    if (showJson) {
                        res.send({ message: errorMsg });
                    }
                    else {
                        res.render('notify/notify', { error: errorMsg });
                    }
                }
            }
            catch (error) {
                return next(error);
            }
        });
    };
}
exports.default = RateLimit;
