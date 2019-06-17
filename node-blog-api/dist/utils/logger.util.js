"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const log4js = require("log4js");
log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: {
            type: 'file',
            filename: path.resolve(__dirname, '../../logs/cheese.log'),
            maxLogSize: 3145728,
            backups: 3,
            compress: true
        }
    },
    categories: {
        cheese: { appenders: ['file'], level: 'error' },
        default: { appenders: ['console'], level: 'debug' }
    }
});
exports.default = process.env.NODE_ENV === 'production' ? log4js.getLogger('cheese') : log4js.getLogger('default');
//# sourceMappingURL=logger.util.js.map