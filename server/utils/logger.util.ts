import path from 'path';
import log4js from 'log4js';
import { isProdMode } from '../configs/index.config';
import { logPath } from './path.util';

log4js.addLayout('json', (config) => {
    return (logEvent) => {
        return JSON.stringify(logEvent) + config.separator;
    };
});

log4js.configure({
    appenders: {
        console: { type: 'console' },
        requestInfoFile: {
            type: 'file',
            filename: path.join(logPath, 'request-info.log'),
            maxLogSize: 3 * 1024 * 1024,
            backups: 3,
            compress: true,
            layout: { type: 'json', separator: ',' },
        },
        infoFile: {
            type: 'file',
            filename: path.join(logPath, 'info.log'),
            maxLogSize: 1024 * 1024,
            backups: 3,
            compress: true,
            layout: { type: 'json', separator: ',' },
        },
        errorFile: {
            type: 'file',
            filename: path.join(logPath, 'error.log'),
            maxLogSize: 1024 * 1024,
            backups: 3,
            compress: true,
            layout: { type: 'json', separator: ',' },
        },
    },
    categories: {
        info: { appenders: ['infoFile'], level: 'info' },
        error: { appenders: ['errorFile'], level: 'error' },
        requestInfo: { appenders: ['requestInfoFile'], level: 'info' },
        default: { appenders: ['console'], level: 'debug' },
    },
});

const consoleLogger = log4js.getLogger();

export const requestInfoLogger = isProdMode ? log4js.getLogger('requestInfo') : consoleLogger;

const infoLogger = isProdMode ? log4js.getLogger('info') : consoleLogger;

const errorLogger = isProdMode ? log4js.getLogger('error') : consoleLogger;

if (isProdMode) {
    Object.assign(infoLogger, {
        error: (message: any, ...args: any[]): void => {
            errorLogger.error(message, args);
        },
    });
}
export default infoLogger;
