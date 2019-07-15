import * as path from 'path';
import * as log4js from 'log4js';

log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: {
            type: 'file',
            filename: path.resolve(__dirname, '../../logs/cheese.log'),
            maxLogSize: 3145728, // 3m
            backups: 3,
            compress: true,
        },
    },
    categories: {
        cheese: { appenders: ['file'], level: 'error' },
        default: { appenders: ['console'], level: 'debug' },
    },
});

export default process.env.NODE_ENV === 'production' ? log4js.getLogger('cheese') : log4js.getLogger('default');
