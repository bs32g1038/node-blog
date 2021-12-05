import { MONGODB } from '../server/configs/index.config';
import mongoose from 'mongoose';

module.exports = async () => {
    const conn = await mongoose.connect(MONGODB.uri);
    await conn.connection.dropDatabase();
    await conn.disconnect();
};
