import { MONGODB } from '../src/configs/index.config';
import * as mongoose from 'mongoose';

module.exports = async () => {
    const conn = await mongoose.connect(MONGODB.uri);
    await conn.connection.dropDatabase();
};
