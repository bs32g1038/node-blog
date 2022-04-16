import mongoose from 'mongoose';
import { Module, Global } from '@nestjs/common';
import { MONGODB } from '@blog/server/configs/index.config';

const DB_CONNECTION_TOKEN = Symbol('DB_CONNECTION_TOKEN');

const Connection = {
    provide: DB_CONNECTION_TOKEN,
    useFactory: () => {
        return mongoose.connect(MONGODB.uri);
    },
};

@Global()
@Module({
    providers: [Connection],
})
export class DatabaseModule {}
