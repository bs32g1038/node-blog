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
const LRU = require("lru-cache");
const cache = new LRU();
const SEPARATOR = '☆@☆';
function RateLimit(options) {
    const cf = {
        expired: 1000 * 60 * 60 * 24,
        limitCount: 150,
        errorMsg: 'There is an exception to your IP, please try again later.',
        status: 429,
        showJson: true,
        name: 'rate-limit',
        keyGenerator(req) {
            let ipAddress;
            const headers = req.headers;
            const forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
            forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
            if (!ipAddress) {
                ipAddress = req.connection.remoteAddress;
            }
            return ipAddress;
        }
    };
    Object.assign(cf, options || {});
    const { keyGenerator, limitCount, expired, status, errorMsg, name } = cf;
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const key = name + SEPARATOR + keyGenerator(req) + SEPARATOR + limitCount;
        try {
            let count = yield cache.get(key);
            count = count || 0;
            if (count < limitCount) {
                count += 1;
                cache.set(key, count, expired);
                res.set('X-RateLimit-Limit', limitCount);
                res.set('X-RateLimit-Remaining', limitCount - count);
                next();
            }
            else {
                res.status(status).json({ msg: errorMsg });
            }
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = RateLimit;
//# sourceMappingURL=rate-limit.util.js.map