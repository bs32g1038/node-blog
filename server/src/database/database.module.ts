import { Module, Global } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { MONGODB } from '../configs/index.config';
import { isTestMode } from '../configs/index.config';

const DB_CONNECTION_TOKEN = Symbol('DB_CONNECTION_TOKEN');

const Connection = {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => {
        const RECONNET_INTERVAL = 500;

        if (!isTestMode) {
            mongoose.connection.on('connecting', () => {
                console.log('数据库连接中...');
            });

            mongoose.connection.on('open', () => {
                console.info('数据库连接成功！');
            });

            mongoose.connection.on('disconnected', () => {
                console.error(`数据库失去连接！尝试 ${RECONNET_INTERVAL / 1000}s 后重连`);
            });

            mongoose.connection.on('error', error => {
                console.error('数据库发生异常！', error);
                mongoose.disconnect();
            });
        }

        return mongoose.connect(MONGODB.uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            autoReconnect: true,
            useFindAndModify: false,
            reconnectInterval: RECONNET_INTERVAL,
        });
    },
};

@Global()
@Module({
    providers: [Connection],
})
export class DatabaseModule {}
