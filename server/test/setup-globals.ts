import { MONGODB } from '../src/configs/index.config';
import * as mongoose from 'mongoose';

module.exports = async () => {
    const conn = mongoose.createConnection(MONGODB.uri);
    await conn.dropDatabase();
};
